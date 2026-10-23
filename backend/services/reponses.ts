// Create the reponses service based on the drinks.ts service
import path from "node:path";
import { Reponse, NewReponse } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/reponses.json");



const defaultReponses: Reponse[] = [
  {
    id: 1,
    question: "Quels sont selon vous les points forts de notre service ?",
    reponse: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates",
  },
  {
    id: 2,
    question:  "Quels aspects de notre service pourraient être améliorés ?",
    reponse: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
  },
  {
    id: 3,
    question:     "Y a-t-il des fonctionnalités ou des services supplémentaires que vous aimeriez voir ?",
    reponse: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
  },
  
];

function readAllReponses(order: string | undefined): Reponse[] {
  const orderByReponse = order && order.includes("question") ? order : undefined;

  let orderedMenu: Reponse[] = [];
  const reponses = parse(jsonDbPath, defaultReponses);
  if (orderByReponse)
    orderedMenu = [...reponses].sort((a, b) => a.question.localeCompare(b.question));

  if (orderByReponse === "-reponse") orderedMenu = orderedMenu.reverse();

  return orderedMenu.length === 0 ? reponses : orderedMenu;
}

function readReponseById(id: number): Reponse | undefined {
  const reponses = parse(jsonDbPath, defaultReponses);
  return reponses.find((reponse) => reponse.id === id);
}

function createReponse(newReponse: NewReponse): Reponse {
  const reponses = parse(jsonDbPath, defaultReponses);
  const lastId = reponses[reponses.length - 1].id;
  const reponse: Reponse = { id: lastId + 1, ...newReponse };
  const updatedReponses = [...reponses, reponse];
  serialize(jsonDbPath, updatedReponses);
  return reponse;
}

function deleteReponse(id: number): Reponse | undefined {
  const reponses = parse(jsonDbPath, defaultReponses);
  const index = reponses.findIndex((reponse) => reponse.id === id);
  if (index === -1) return undefined;

  const deletedElements = reponses.splice(index, 1);
  serialize(jsonDbPath, reponses);
  return deletedElements[0];
}



export { readAllReponses, readReponseById, createReponse, deleteReponse };
