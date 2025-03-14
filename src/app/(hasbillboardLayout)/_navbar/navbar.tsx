import { categoryAPI } from "@/apiRequest/categoryAPI";
import { storeAPI } from "@/apiRequest/storeAPI";
import { handlError } from "@/components/handle-error";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import ListRoute from "@/app/(hasbillboardLayout)/_navbar/_components/list-route";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import UserAvatar from "@/components/user-avatar";

async function MainNav() {
  let listCategory: ListCategoryResType | null = null;
  let listBillboard: ListBillboardResType | null = null;
  let store: any | null = null;
  try {
    listCategory = await categoryAPI.getListCategory();
    listBillboard = await billboardAPI.getListBillboard();
    store = await storeAPI.getStore();
  } catch (error) {
    handlError({ consoleError: "GET_API_CATEGORY_ERROR", error });
  }
  return (
    <>
      <div>
        <ListRoute
          store={store?.data}
          listCategory={listCategory && listCategory.data}
          listBillboard={listBillboard && listBillboard.data}
        />{" "}
      </div>
    </>
  );
}

export default MainNav;
