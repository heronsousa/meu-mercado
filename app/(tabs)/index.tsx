import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { getNfceSummary } from "@/services/get-nfce-summary";
import { NfceSummary } from "@/types";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getContrastColor } from "@/utils/get-constrast-color";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [nfceSummary, setNfceSummary] = useState({} as NfceSummary);

  async function fetchNfces() {
    const data = await getNfceSummary();

    setNfceSummary(data);
  }

  useEffect(() => {
    fetchNfces();
  }, []);

  const onRefresh = useCallback(() => {
    fetchNfces();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        >
          <View className="gap-6 px-4 pb-8">
            <View className="gap-2">
              <Text className="text-3xl text-center font-bold">
                Histórico de Compras
              </Text>
              <Text className="text-center text-neutral-500">
                Todas as suas notas fiscais organizadas
              </Text>
            </View>

            <Card className="bg-white w-full p-4 flex-row items-center">
              <View className="flex-row flex-1 items-center border border-neutral-200 rounded-md px-3">
                <Feather name="search" size={20} color="gray" />
                <TextInput
                  placeholder="Buscar por loja"
                  className="pl-4 flex-1"
                />
              </View>
              <Button variant="ghost" className="bg-transparent">
                <Feather name="filter" size={22} color="gray" />
              </Button>
            </Card>

            <View className="flex-row gap-3 pr-6">
              <Card className="w-1/3 p-4 gap-2 items-center bg-white">
                <MaterialCommunityIcons
                  name="invoice-list-outline"
                  size={28}
                  color="red"
                />
                <Text className="text-xl font-bold">
                  {nfceSummary.invoiceCount}
                </Text>
                <Text className="text-sm text-neutral-500">Notas Fiscais</Text>
              </Card>

              <Card className="w-1/3 p-4 gap-2 items-center bg-white">
                <Feather name="trending-up" size={24} color="green" />
                <Text className="text-xl font-bold">
                  {formatCurrency(nfceSummary.totalAmount)}
                </Text>
                <Text className="text-sm text-neutral-500">Total Gasto</Text>
              </Card>

              <Card className="w-1/3 p-4 gap-2 items-center bg-white">
                <Feather name="calendar" size={24} />
                <Text className="text-xl font-bold">
                  {formatCurrency(nfceSummary.averageValue)}
                </Text>
                <Text className="text-sm text-neutral-500">Ticket Médio</Text>
              </Card>
            </View>

            <View className="gap-4 w-full">
              {nfceSummary.nfces?.map((nfce) => (
                <Card className="bg-white p-3 transition-smooth">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-start gap-4">
                      <View className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Feather name="shopping-bag" size={24} color="red" />
                      </View>
                      <View className="gap-2">
                        <View>
                          <Text className="font-semibold text-lg">
                            {nfce.store}
                          </Text>
                          <Text className="text-sm text-neutral-500">
                            {formatDate(nfce.date)} • {nfce.productCount}{" "}
                            {nfce.productCount > 1 ? "itens" : "item"}
                          </Text>
                        </View>
                        <View className="flex-row gap-2">
                          <Text
                            className={`px-2 py-1 rounded-full text-xs font-medium `}
                            style={{
                              backgroundColor: `${nfce.categories[0].color}`,
                              color: getContrastColor(nfce.categories[0].color),
                            }}
                          >
                            {nfce.categories[0].name}
                          </Text>
                          {nfce.categories.length - 1 && (
                            <Text className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{nfce.categories.length - 2}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View className="flex-row items-center">
                      <View>
                        <Text className="text-xl font-bold">
                          {formatCurrency(nfce.total)}
                        </Text>
                      </View>
                      <Button variant="ghost" className="bg-transparent">
                        <Feather name="eye" size={24} color="gray" />
                      </Button>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
