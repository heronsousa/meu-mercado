import { Idle } from "@/components/idle";
import { InvoiceError } from "@/components/invoice-error";
import { InvoiceSuccess } from "@/components/invoice-success";
import { Processing } from "@/components/processing";
import { Scanning } from "@/components/scanning";
import { registerNfce } from "@/services/registerNfce";
import { Nfce } from "@/types";
import { extractNfceKey } from "@/utils/extract-nfce-key";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import { useState } from "react";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [nfce, setNfce] = useState<Nfce>({} as Nfce);
  const [errorMessage, setErrorMessage] = useState("");
  const [scanningStep, setScanningStep] = useState<
    "idle" | "scanning" | "processing" | "success" | "error"
  >("idle");

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
      .catch((e) => {
        if (typeof e === "string") {
          setErrorMessage(e);
        }

        console.log(e);
        setScanningStep("error");
      });
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

  if (scanningStep === "error") {
    return (
      <InvoiceError
        errorMessage={errorMessage}
        handleScanOtherInvoice={() => setScanningStep("scanning")}
        handleGoBack={() => setScanningStep("idle")}
      />
    );
  }

  return (
    <InvoiceSuccess
      nfce={nfce}
      handleScanOtherInvoice={() => setScanningStep("idle")}
    />
  );
}
