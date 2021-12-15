import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
} // enum은 기본적으로 type이 number임

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

const savedToDos = localStorage.getItem("toDos");
const parsedToDos = JSON.parse(savedToDos as string);

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: savedToDos ? parsedToDos : [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
