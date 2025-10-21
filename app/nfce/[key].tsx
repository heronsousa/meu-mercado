import { Button } from "@/components/Button";
import InvoiceSummary from "@/components/invoice-summary";
import { NFCE } from "@/contants/nfce";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NfceDetails() {
  const [nfce, setNfce] = useState(NFCE);
  const { key } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView>
        <View className="flex-row gap-8 items-center p-4 pb-8">
          <Button
            variant="secondary"
            className="w-12 h-12 rounded-full relative"
            onPress={() => router.back()}
          >
            <Feather
              name="chevron-left"
              size={24}
              color="black"
              className="absolute"
            />
          </Button>
          <Text className="text-2xl text-center font-bold">Detalhes da compra</Text>
        </View>

        <InvoiceSummary nfce={nfce}/> 
      </ScrollView>
    </SafeAreaView>
  );
}
