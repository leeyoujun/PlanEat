import { Module } from 'vuex';
import { RootState } from ".";
import { FrigeType } from "@/types/frige";
import axios, { AxiosResponse } from 'axios';

export interface FrigeModuleState {
  items: FrigeType[];
  itemsBeAdd: FrigeType[];
  itemsBeDeleted: FrigeType[];
}

export const FrigeModule: Module<FrigeModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    items: [{ id: "20210902apple", name: "사과", engName: "apple", updatedDate: new Date(), amount: "충분" },
    { id: "20210902persimmon", name: "감", updatedDate: new Date(-1), amount: "충분" },
    { id: "20210904cabbage", name: "배추", updatedDate: new Date(-2), amount: "충분" },
    {
      id: "20210904strawberry", name: "딸기", updatedDate: new Date(5), amount: "충분"
    },
    { id: "20210906kimchi", name: "김치", updatedDate: new Date(-4), amount: "충분" },],

    itemsBeAdd: [],
    itemsBeDeleted: [],
  }),
  getters: {
    getItemName: (state) => {
      const itemNames: string[] = [];
      state.itemsBeAdd.forEach((item) => {
        itemNames.push(item.name);
      });
      return itemNames;
    }
  },
  mutations: {
    fetchItemsBeAdd(state, payload) {
      const selectedItems: FrigeType[] = [];
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();

      if (payload) {
        payload.forEach((element: FrigeType) => {
          const ItemId = String(year) + String(month) + String(day) + element.engName;
          const ItemObject: FrigeType = {
            name: element.name,
            amount: "보통",
            id: ItemId,
            updatedDate: date,
          };
          selectedItems.push(ItemObject);
          state.items.push(ItemObject);
        });
        state.itemsBeAdd = selectedItems;
      } else {
        return;
      }

    },
    fetchItemsBeDelete(state, payload) {
      const selectedItems: FrigeType[] = [];
      console.log(payload);
      payload.forEach((id: string) => {
        state.items.forEach((el: FrigeType) => {
          if (el.id === id) {
            selectedItems.push(el);
            state.items.splice(state.items.indexOf(el), 1);
          }
        });
      });
      state.itemsBeDeleted = selectedItems;
    }
  },
  actions: {
    frizeIngredientGet(context) {
    },
    frizeIngredient(constext) { },
    frizeAdd(constext) { },
    frizeDelete(constext) { },
    AllFrizeGet(constext) { }

  }
};