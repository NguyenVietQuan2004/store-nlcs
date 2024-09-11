import { categoryAPI } from "@/apiRequest/categoryAPI";
import { handlError } from "@/components/handle-error";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import ListRoute from "@/app/(hasbillboardLayout)/_navbar/_components/list-route";

async function MainNav() {
  let listCategory: ListCategoryResType | null = null;
  try {
    listCategory = await categoryAPI.getListCategory();
  } catch (error) {
    handlError({ consoleError: "GET_API_CATEGORY_ERROR", error });
  }
  return (
    <div>
      <ListRoute listCategory={listCategory && listCategory.data} />
    </div>
  );
}

export default MainNav;
