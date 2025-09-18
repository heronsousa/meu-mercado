import Idle from "@/components/Idle";
import InvoiceSuccess from "@/components/InoiceSuccess";
import Processing from "@/components/Processing";
import Scanning from "@/components/Scanning";
import { NFCE } from "@/contants/nfce";
import { registerNfce } from "@/services/registerNfce";
import { Nfce } from "@/types";
import { extractNfceKey } from "@/utils/extractNfceKey";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import { useState } from "react";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [nfce, setNfce] = useState<Nfce>(NFCE);
  const [scanningStep, setScanningStep] = useState<
    "idle" | "scanning" | "processing" | "success"
  >("success");

  async function handleScanQRCode() {
    if (!permission?.granted) {
      requestPermission().then((result) => {
        if (result.granted) {
          setScanningStep("scanning");
        }
      });

      return;
    }

    setScanningStep("scanning");
  }

  function handleBarcodeScanned({ data }: BarcodeScanningResult) {
    setScanningStep("processing");

    registerNfce(extractNfceKey(data))
      .then((nfce) => {
        if (nfce) {
          setNfce(nfce);
          console.log(nfce);
          setScanningStep("success");
        }
      })
      .catch(() => setScanningStep("idle"));
  }

  if (scanningStep === "idle") {
    return <Idle handleScanQRCode={handleScanQRCode} />;
  }

  if (scanningStep === "scanning") {
    return (
      <Scanning
        setScanningStep={setScanningStep}
        handleBarcodeScanned={handleBarcodeScanned}
      />
    );
  }

  if (scanningStep === "processing") {
    return <Processing />;
  }

  return <InvoiceSuccess nfce={nfce} />;
}
