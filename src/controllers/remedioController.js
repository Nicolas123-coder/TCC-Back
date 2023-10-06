import { RemedioModel } from "../models/Remedio.js";

export async function createRemedio(req, res) {
  try {
    const data = req.body;
    const remedio = await RemedioModel.create(data);

    return res.status(201).json(remedio);
  } catch (error) {
    return res.status(500).json();
  }
}

export async function getRemedios(res) {
  try {
    const remedios = await RemedioModel.find();

    return res.status(200).json(remedios);
  } catch (error) {
    return res.status(400).json();
  }
}

export async function getRemedio(nfcId, res) {
  try {
    const remedio = await RemedioModel.findOne({ nfcId });

    return res.status(200).json(remedio);
  } catch (error) {
    return res.status(400).json();
  }
}

export async function baixaRemedio(req, res) {
  try {
    const nfcId = req.body.nfcId;

    const query = { nfcId: nfcId };
    const remedio = await RemedioModel.find(query);

    console.log("remedio", remedio[0]);

    let quantidade = remedio[0].quantity;

    if (quantidade === 0) {
      const newRemedio = await RemedioModel.updateOne(query, {
        $set: { status: "OUT_OF_STOCK" }
      });

      return res.status(200).json(newRemedio);
    } else {
      const newRemedio = await RemedioModel.updateOne(query, {
        $set: { status: "IN_STOCK" },
        $push: { patients: "Nicolas test 2" },
        $inc: { quantity: -1 }
      });

      return res.status(200).json(newRemedio);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}

export async function verifyExpiredMedicine(res) {
  try {
    //Reference dates
    const currentDate = new Date();
    const minExpirationDate = new Date();
    minExpirationDate.setDate(currentDate.getDate() + 5);

    let expiredMedicines = [];
    let almostExpiredMedicines = [];

    //Expired medication
    await RemedioModel.find({
      expireDate: { $lte: currentDate },
    })
      .then((items) => {
        expiredMedicines = items;

        console.log("Itens que já venceram:", expiredMedicines);
      })
      .catch((error) => {
        console.error("Erro na consulta:", error);
      });

    //Almost expired medication
    await RemedioModel.find({
      expireDate: { $gt: currentDate, $lte: minExpirationDate },
    })
      .then((items) => {
        almostExpiredMedicines = items;

        console.log(
          "Itens que estão perto do vencimento:",
          almostExpiredMedicines
        );
      })
      .catch((error) => {
        console.error("Erro na consulta:", error);
      });

    return res.status(200).json({
      expiredMedicines: expiredMedicines,
      almostExpiredMedicines: almostExpiredMedicines,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}
