import { Router } from "express";

import { NewReponse } from "../types";
import {
  createReponse,
  deleteReponse,
  readAllReponses,
  readReponseById,
} from "../services/reponses";
import { authorize, isAdmin } from "../utils/auths";

const router = Router();

router.get("/error", (_req, _res, _next) => {
  throw new Error("This is an error");
  // equivalent of next(new Error("This is an error"));
});

/* Read all the reponses from the menu
   GET /reponses?order=title : ascending order by title
   GET /reponses?order=-title : descending order by title
*/
router.get("/", (req, res) => {
  if (req.query.order && typeof req.query.order !== "string") {
    return res.sendStatus(400);
  }

  const reponses = readAllReponses(req.query.order);
  return res.json(reponses);
});

// Read the reponse identified by an id in the menu
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const reponse = readReponseById(id);
  if (!reponse) return res.sendStatus(404);
  return res.json(reponse);
});

// Create a reponse to be added to the menu.
router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("question" in body) ||
    !("reponse" in body) ||
    typeof body.question !== "string" ||
    typeof body.reponse !== "string" ||
    !body.question.trim() ||
    !body.reponse.trim()
  ) {
    return res.sendStatus(400);
  }

  const { question, reponse } = body as NewReponse;

  const addedReponse = createReponse({ question, reponse });

  return res.json(addedReponse);
});

// Delete a reponse from the menu based on its id
router.delete("/:id", authorize, isAdmin, (req, res) => {
  const id = Number(req.params.id);
  const deletedReponse = deleteReponse(id);
  if (!deletedReponse) return res.sendStatus(404);

  return res.json(deletedReponse);
});



export default router;
