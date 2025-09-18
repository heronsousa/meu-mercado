export function extractNfceKey(qrCodeUrl: string) {
  const url = new URL(qrCodeUrl);
  const chaveNFe = url.searchParams.get("p")?.split('|')[0];

  if (chaveNFe && /^[0-9]{44}$/.test(chaveNFe)) {
    return chaveNFe;
  }

  return '';
}