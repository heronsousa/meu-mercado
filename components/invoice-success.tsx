import { Nfce } from "@/types";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { Button } from "./Button";
import InvoiceSummary from "./invoice-summary";

type InvoiceSuccessProps = {
  nfce: Nfce;
  handleScanOtherInvoice: () => void;
};

export function InvoiceSuccess({
  nfce,
  handleScanOtherInvoice,
}: InvoiceSuccessProps) {
  return (
    <ScrollView className="min-h-screen pt-20 px-4 gap-6 bg-background">
      <Button
        variant="secondary"
        className="w-12 h-12 rounded-full relative"
        onPress={handleScanOtherInvoice}
      >
        <Feather
          name="chevron-left"
          size={24}
          color="black"
          className="absolute"
        />
      </Button>

      <View className="text-center gap-4 flex items-center mb-8">
        <View className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto">
          <Feather name="check-square" size={24} color="green" />
        </View>
        <Text className="text-2xl font-bold text-success">
          Nota Fiscal Processada!
        </Text>
        <Text className="text-muted-foreground">
          Dados extraídos e categorizados automaticamente
        </Text>
      </View>

      <InvoiceSummary nfce={nfce} />

      <Button onPress={handleScanOtherInvoice}>
        <Text className="text-white font-semibold">
          Escanear Outra Nota Fiscal
        </Text>
      </Button>
      <View className="h-24"></View>
    </ScrollView>
  );
}
