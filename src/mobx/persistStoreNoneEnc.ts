import { persistence, StorageAdapter } from "mobx-persist-store";

const persistStoreNoneEnc = <T extends Record<string, any>>(
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
                return data ? JSON.parse(data) : undefined;
            },
            write: async (itemName: string, content: String) => {
                localStorage.setItem(itemName, JSON.stringify(content));
            },
        }),
    })(target);
};

export default persistStoreNoneEnc;
