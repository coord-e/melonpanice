import firebase from ".";
import db, { melonpanice } from "./db";
import debounce from "lodash.debounce";

const increment = firebase.firestore.FieldValue.increment(1);

async function incrementExplosionCount(): Promise<void> {
  try {
    await db.runTransaction(async transaction => {
      const melonpaniceDoc = await transaction.get(melonpanice);

      if (!melonpaniceDoc.exists) {
        throw "Document does not exist!";
      }

      const explosion_count = melonpaniceDoc.data()!.explosion_count + 1;
      transaction.update(melonpanice, { explosion_count });
    });
  } catch (error) {
    throw error;
  }
}

function axisToIncrement(axis: "x" | "y" | "both") {
  switch (axis) {
    case "x":
      return { x: increment };
    case "y":
      return { y: increment };
    case "both":
      return { x: increment, y: increment };
  }
}

export default async function incrementSize(
  axis: "x" | "y" | "both"
): Promise<void> {
  try {
    await melonpanice.update(axisToIncrement(axis));

    const doc = await melonpanice.get();
    const { x, y } = doc.data()!;
    if (x * y > 10000) {
      debounce(async () => {
        await melonpanice.update({
          x: 10,
          y: 10
        });
        await incrementExplosionCount();
      }, 700)();
    }
  } catch (error) {
    throw error;
  }
}
