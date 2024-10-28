const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", (accounts) => {
  let fundraiser;
  const id = 0;
  const name = "custodian name";
  const images = ["https://placekikken.com/600/350", "https://placekikken.com/600/350"];
  const categories = ["war", "crime", "health"];
  const description = "Beneficiary description";
  const country = "Brazil";
  const beneficiary = accounts[1];
  const owner = accounts[0];
  const goal = 1000;

  beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      id,
      name,
      images,
      categories,
      description,
      country,
      beneficiary,
      owner,
      goal
    );
  });

  describe("initialization", () => {
    it("gets the beneficiary name", async () => {
      const actaul = await fundraiser.name();
      assert.equal(actaul, name, "name should match");
    });

    it("gets the beneficiary images", async () => {
      const actaul = await fundraiser.getImageUrls();
      assert.equal(actaul[0], images[0], "imageURL should match");
      assert.equal(actaul[1], images[1], "imageURL should match");
    });

    it("gets the beneficiary categories", async () => {
      const actaul = await fundraiser.getCategories();
      assert.equal(actaul[0], categories[0], "imageURL should match");
      assert.equal(actaul[1], categories[1], "imageURL should match");
    });

    it("gets the beneficiary description", async () => {
      const actaul = await fundraiser.description();
      assert.equal(actaul, description, "description should match");
    });

    it("gets the beneficiary", async () => {
      const actaul = await fundraiser.beneficiary();
      assert.equal(actaul, beneficiary, "beneficiary should match");
    });

    it("gets the owner", async () => {
      const actaul = await fundraiser.owner();
      assert.equal(actaul, owner, "owner should match");
    });
  });

  describe("setBeneficiary", () => {
    const newBeneficiary = accounts[2];

    it("update beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, { from: owner });
      const actualBeneficiary = await fundraiser.beneficiary();
      assert.equal(
        actualBeneficiary,
        newBeneficiary,
        "beneficiary should match"
      );
    });

    it("throws an error when called from a non-owner account", async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, { from: accounts[3] });
        assert.fail("withdraw was not restricted to owners");
      } catch (err) {
        const expectedError = "Ownable: caller is not the owner";
        const actualError = err.reason;
        assert.equal(actualError, expectedError, "should not be permitted");
      }
    });
  });

  describe("making donations", () => {
    const value = web3.utils.toWei("0.0289");
    const donor = accounts[2];

    it("increase myDonationsCount", async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });

      await fundraiser.donate({ from: donor, value });

      const newDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });

      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        "myDonationsCount should increment by 1"
      );
    });
    it("includes donation in myDonations", async () => {
      await fundraiser.donate({ from: donor, value });
      const { values, dates } = await fundraiser.myDonations({ from: donor });

      assert.equal(value, values[0], "values should match");
      assert(dates[0], "date should be present");
    });

    it("includes donation in allDonations", async () => {
      await fundraiser.donate({ from: donor, value });
      await fundraiser.donate({ from: accounts[3], value });
      await fundraiser.donate({ from: accounts[4], value });
      const { donors, values, dates } = await fundraiser.allDonations();

      assert.equal(value, values[0], "values should match");
      assert.equal(donor, donors[0], "donors should match");
      assert(dates[0], "date should be present");
    });

    it("increases the totalDonations amount", async () => {
      const currentTotalDonations = await fundraiser.totalDonations();
      await fundraiser.donate({ from: donor, value });
      const newTotalDonations = await fundraiser.totalDonations();

      const diff = newTotalDonations - currentTotalDonations;

      assert.equal(diff, value, "difference should match the donation value");
    });

    it("increases donationsCount", async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await fundraiser.donate({ from: donor, value });
      const newDonationsCount = await fundraiser.donationsCount();

      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        "donationsCounts should increment by 1"
      );
    });

    it("emits the DonationReceived Event", async () => {
      const tx = await fundraiser.donate({ from: donor, value });
      const expectedEvent = "DonationReceived";
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, "events should match");
    });
  });

  describe("creating proposal", () => {
    const donor = accounts[2];
    const nonDonor = accounts[3];
    it("creates a proposal", async () => {
      const tx = await fundraiser.createProposal("hello", "testing", {
        from: owner,
      });

      const expectedEvent = "ProposalCreated";
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, "events should match");
    });

    it("includes proposal in allProposals", async () => {
      await fundraiser.createProposal("hello1", "testing1", {
        from: owner,
      });
      await fundraiser.createProposal("hello2", "testing2", {
        from: owner,
      });
      await fundraiser.createProposal("hello3", "testing3", {
        from: owner,
      });

       try{
        const proposals = await fundraiser.getProposals();
        const formattedProposals = proposals.map((proposal) => ({
          id: proposal[0],
          title: proposal[1],
          description: proposal[2],
          date: proposal[3],
          upvotes: proposal[4],
          downvotes: proposal[5]
        }));
        assert.equal("hello1", formattedProposals[0].title, "title should match");
        assert.equal("testing1", formattedProposals[0].description, "description should match");
       }catch(error){
        console.log(error)
       }

    });

    it("increases the proposal count", async () => {
      const currentID = await fundraiser.proposalCount();
      await fundraiser.createProposal("hello2", "testing2", {
        from: owner,
      });
      const newCurrentID = await fundraiser.proposalCount();

      const diff = newCurrentID - currentID;

      assert.equal(diff, 1, "difference should match");
    });

    it("should allow only donors to vote", async () => {
      await fundraiser.createProposal("hello1", "testing1", {
        from: owner,
      });
      // Donate to become a donor
      await fundraiser.donate({ from: donor, value: web3.utils.toWei("1", "ether") });
  
      // Attempt to vote as a non-donor, expect it to fail
      try {
        await fundraiser.vote(1, true, { from: nonDonor });
        assert.fail("Non-donor should not be able to vote");
      } catch (error) {
        assert(error.message.includes("Only donors can vote"), "Expected only donors restriction");
      }
    });
  
    it("should allow donor to upvote and emit Voted event", async () => {
      await fundraiser.createProposal("hello1", "testing1", {
        from: owner,
      });
      // Donor votes on the proposal
      // Donate to become a donor
      await fundraiser.donate({ from: donor, value: web3.utils.toWei("0.025", "ether") });
      const result = await fundraiser.vote(1, true, { from: donor });
  
      // Verify upvote is recorded
      const proposal = await fundraiser.proposals(1);
      assert.equal(proposal.upvotes, 1, "Upvote count should be 1");
      assert.equal(proposal.downvotes, 0, "Downvote count should be 0");
  
      // Check event
      const event = result.logs[0];
      assert.equal(event.event, "Voted", "Expected Voted event");
      assert.equal(event.args.id.toString(), "1", "Event proposal ID should be 1");
      assert.equal(event.args.voter, donor, "Event voter address should be correct");
      assert.equal(event.args.upvote, true, "Event should indicate upvote");
    });
  
    it("should prevent duplicate voting by the same donor", async () => {
      await fundraiser.createProposal("hello1", "testing1", {
        from: owner,
      });
      await fundraiser.donate({ from: donor, value: web3.utils.toWei("0.025", "ether") });
      // Attempt to vote again on the same proposal by the same donor
      try {
        await fundraiser.vote(1, false, { from: donor });

        await fundraiser.vote(1, false, { from: donor });
        assert.fail("Donor should not be able to vote twice on the same proposal");
      } catch (error) {
        assert(error.message.includes("You have already voted on this proposal"), "Expected already voted restriction");
      }
    });
  
    it("should allow a new donor to downvote on an existing proposal", async () => {
      await fundraiser.createProposal("hello1", "testing1", {
        from: owner,
      });
      // New donor
      const newDonor = accounts[4];
  
      // Donate to become a donor
      await fundraiser.donate({ from: newDonor, value: web3.utils.toWei("1", "ether") });

      await fundraiser.donate({ from: donor, value: web3.utils.toWei("1", "ether") });
  
      // Donor downvotes the proposal
      const result = await fundraiser.vote(1, false, { from: newDonor });
      
      await fundraiser.vote(1, true, { from: donor });
  
      // Verify downvote is recorded
      const proposal = await fundraiser.proposals(1);
      assert.equal(proposal.upvotes, 1, "Upvote count should still be 1");
      assert.equal(proposal.downvotes, 1, "Downvote count should be 1");
  
      // Check event
      const event = result.logs[0];
      assert.equal(event.event, "Voted", "Expected Voted event");
      assert.equal(event.args.id.toString(), "1", "Event proposal ID should be 1");
      assert.equal(event.args.voter, newDonor, "Event voter address should be correct");
      assert.equal(event.args.upvote, false, "Event should indicate downvote");
    });

    it("emits the ProposalCreated Event", async () => {
      const tx = await fundraiser.createProposal("hello2", "testing2", {
        from: owner,
      });
      const expectedEvent = "ProposalCreated";
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, "events should match");
    });
  });

  describe("creating media archive", () => {
    it("creates a media archive", async () => {
      const tx = await fundraiser.createMediaArchive("hello", "testing", "www.fundbrave.com", {
        from: owner,
      });

      const expectedEvent = "MediaArchiveCreated";
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, "events should match");
    });

    it("includes media in all media Archive", async () => {
      await fundraiser.createMediaArchive("hello1", "testing1", "www.fundbrave.com", {
        from: owner,
      });
      await fundraiser.createMediaArchive("hello2", "testing2", "www.fundbrave.com", {
        from: owner,
      });
      await fundraiser.createMediaArchive("hello3", "testing3", "www.fundbrave.com", {
        from: owner,
      });

       try{
        const mediaArchives = await fundraiser.getMediaArchive();
        const formattedMediaArchives = mediaArchives.map((mediaArchive) => ({
          id: mediaArchive[0],
          title: mediaArchive[1],
          description: mediaArchive[2],
          url: mediaArchive[3],
          date: mediaArchive[4],
        }));
        assert.equal("hello1", formattedMediaArchives[0].title, "title should match");
        assert.equal("testing1", formattedMediaArchives[0].description, "description should match");
       }catch(error){
        console.log(error)
       }

    });

    it("increases the media archive count", async () => {
      const currentID = await fundraiser.mediaArchiveCount();
      await fundraiser.createMediaArchive("hello3", "testing3", "www.fundbrave.com", {
        from: owner,
      });
      const newCurrentID = await fundraiser.mediaArchiveCount();

      const diff = newCurrentID - currentID;

      assert.equal(diff, 1, "difference should match");
    });

  
    it("emits the MediaArchiveCreated Event", async () => {
      const tx = await fundraiser.createMediaArchive("hello3", "testing3", "www.fundbrave.com", {
        from: owner,
      });
      const expectedEvent = "MediaArchiveCreated";
      const actualEvent = tx.logs[0].event;

      assert.equal(actualEvent, expectedEvent, "events should match");
    });
  });

  describe("withdrawing funds", () => {
    beforeEach(async () => {
      await fundraiser.donate({
        from: accounts[2],
        value: web3.utils.toWei("0.1"),
      });
    });

    describe("access controls", () => {
      it("throws an error when called from a non-onwer account", async () => {
        try {
          await fundraiser.withdraw({ from: accounts[3] });
          assert.fail("withdraw was not restricted to owner");
        } catch (err) {
          const expectedError = "Ownable: caller is not the owner";
          const actualError = err.reason;
          assert.equal(actualError, expectedError, "should not be permitted");
        }
      });

      it("permits the owner to call the funtion", async () => {
        try {
          await fundraiser.withdraw({ from: owner });
          assert(true, "no errors were thrown");
        } catch (err) {
          assert.fail("should not have thrown an error");
        }
      });

      it("transfer balance to beneficiary", async () => {
        const currentContractBalance = await web3.eth.getBalance(
          fundraiser.address
        );
        const currentBeneficiaryBalance = await web3.eth.getBalance(
          beneficiary
        );

        await fundraiser.withdraw({ from: owner });

        const newContractBalance = await web3.eth.getBalance(
          fundraiser.address
        );
        const newBeneficiaryBalance = await web3.eth.getBalance(beneficiary);
        const beneficiaryDifference =
          newBeneficiaryBalance - currentBeneficiaryBalance;

        assert.equal(
          beneficiaryDifference,
          currentContractBalance,
          "beneficiary should receive all the funds"
        );
      });

      it("emits withdraw event", async () => {
        const tx = await fundraiser.withdraw({ from: owner });
        const expertedEvent = "Withdraw";
        const actualEvent = tx.logs[0].event;

        assert.equal(actualEvent, expertedEvent, "events should match");
      });
    });
  });

  describe("fallback function", () => {
    const value = web3.utils.toWei("0.0209");

    it("increases the totalDonations amount", async () => {
      const currentTotalDonation = await fundraiser.totalDonations();
      await web3.eth.sendTransaction({
        to: fundraiser.address,
        from: accounts[9],
        value,
      });
      const newTotalDonations = await fundraiser.totalDonations();

      const diff = newTotalDonations - currentTotalDonation;

      assert.equal(diff, value, "difference should match the donation value");
    });

    it("increases dontionsCount", async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await web3.eth.sendTransaction({
        to: fundraiser.address,
        from: accounts[9],
        value,
      });
      const newDonationsCount = await fundraiser.donationsCount();

      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        "donationsCount should increment by 1"
      );
    });
  });
});
