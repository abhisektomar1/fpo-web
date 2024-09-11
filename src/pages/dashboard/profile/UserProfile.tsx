import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import FPODetails from "./FPODetails";
import ShopDetails from "./ShopDetails";


const UserProfile = () => {
  
  return (
      <Card className="p-4 py-8">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">FPO Details</TabsTrigger>
            <TabsTrigger value="password">Shop Details</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <FPODetails />
          </TabsContent>
          <TabsContent value="password">
            <ShopDetails />
          </TabsContent>
        </Tabs>
      </Card>
  );
};

export default UserProfile;
