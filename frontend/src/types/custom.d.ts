// Declare custom types for cryptocompare
declare module "cryptocompare" {
  export async function price(
    from: string,
    to: string[],
  ): Promise<{ [key: string]: number }>;
}
