import { Nfce } from "@/types";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getContrastColor } from "@/utils/get-constrast-color";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { Button } from "./Button";
import { Card } from "./Card";

type InvoiceSuccessProps = {
  nfce: Nfce;
  handleScanOtherInvoice: () => void;
};

function InvoiceSuccess({ nfce, handleScanOtherInvoice }: InvoiceSuccessProps) {
  return (
    <ScrollView className="min-h-screen pt-20 px-4 gap-6 bg-background">
      <Button variant='secondary' className="w-12 h-12 rounded-full" onPress={handleScanOtherInvoice}>
        <Feather name="chevron-left" size={18} color="black" />
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

      <Card className="card-financial p-4 gap-8">
        <View className="flex items-start gap-4">
          <View className="flex-row items-center gap-2">
            <View className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Feather name="shopping-bag" size={16} color="red" />
            </View>
            <Text className="text-lg font-semibold">{nfce.store}</Text>
          </View>
          <View className="gap-1 text-muted-foreground">
            <View className="flex flex-row items-center gap-2">
              <Feather name="map-pin" size={12} color="red" />
              <Text className="text-xs">
                {nfce.neighborhood} - {nfce.city}, {nfce.state}{" "}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Feather name="calendar" size={12} color="red" />
              <Text className="text-xs">{formatDate(nfce.date)}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Feather name="credit-card" size={12} color="red" />
              <Text className="text-xs">{nfce.paymentMethod}</Text>
            </View>
          </View>
        </View>
        <View className="text-right">
          <Text className="text-muted-foreground">Total</Text>
          <Text className="text-xl font-bold">{formatCurrency(nfce.totalPrice)}</Text>
        </View>
      </Card>

      <Card className="card-financial p-4 my-8">
        <Text className="text-lg font-semibold mb-4">
          Produtos ({nfce.products?.length})
        </Text>
        <View className="gap-3">
          {nfce.products?.map((item) => (
            <View
              key={item.id}
              className="flex flex-row items-center justify-between p-3 bg-muted rounded-lg gap-2"
            >
              <View style={{ maxWidth: "70%" }}>
                <View className="flex self-start">
                  <Text
                    className={`px-2 rounded-full text-[10px] font-medium text-gray-800`}
                    style={{
                      backgroundColor: `${item.category.color}`,
                      color: getContrastColor(item.category.color),
                    }}
                  >
                    {item.category.description}
                  </Text>
                </View>
                <Text className="font-medium">{item.description}</Text>
                <Text className="text-sm text-muted-foreground">
                  Qtd: {item.qtd} ×
                  {formatCurrency((Number(item.price) / Number(item.qtd)).toFixed(2))}
                </Text>
              </View>
              <Text className="font-semibold w-16 text-right break-keep">
                {formatCurrency(item.price)}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Button onPress={handleScanOtherInvoice}>
        <Text className="text-white font-semibold">Escanear Outra Nota Fiscal</Text>
      </Button>
      <View className="h-24"></View>
    </ScrollView>
  );
}

export default InvoiceSuccess;