import { persistence, StorageAdapter } from "mobx-persist-store";
import CryptoJS from "crypto-js";
import CommonData from "../module/common/commonData";

const persistStore = <T extends Record<string, any>>(
    target: T,
    properties: string[],
    persistName: string
) => {
    return persistence({
        name: persistName,
        properties: properties,
        adapter: new StorageAdapter({
            read: async (itemName: string) => {
                const data = localStorage.getItem(itemName);
                return data
                    ? JSON.parse(
                          CryptoJS.AES.decrypt(data, CommonData.encKey).toString(CryptoJS.enc.Utf8)
                      )
                    : undefined;
            },
            write: async (itemName: string, content: String) => {
                localStorage.setItem(
                    itemName,
                    CryptoJS.AES.encrypt(JSON.stringify(content), CommonData.encKey).toString()
                );
            },
        }),
    })(target);
};

export default persistStore;
