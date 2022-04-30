import express from "express";
import { promises as fs } from "fs";

const router = express.Router();

const compare = (a, b) => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
};

router.get("/maisModelosOld", async (req, res) => {

    const cars = JSON.parse(await fs.readFile("car-list.json", "utf-8"));

    const carsByModelsSize = cars.map(c => ({ brand: c.brand, size: c.models.length }));

    let maisModelos = carsByModelsSize.reduceRight((a, c) => {
        if (!a[0] || c.size == a[0].size) {
            a.push(c);
        } else if (c.size > a[0].size) {
            a = [ c ];
        }

        return a;
    }, []);

    if (maisModelos.size > 1) {
        res.send(maisModelos.map(c => c.brand));
    } else {
        res.send(maisModelos[0].brand);
    }
});

router.get("/maisModelos", async (req, res) => {

    const cars = JSON.parse(await fs.readFile("car-list.json", "utf-8"));

    const carsByModelsSize = cars.sort((a, b) => compare(a.models.length, b.models.length) * -1);

    let maisModelos = carsByModelsSize.filter(c => c.models.length === carsByModelsSize[0].models.length);

    if (maisModelos.size > 1) {
        res.send(maisModelos.map(c => c.brand));
    } else {
        res.send(maisModelos[0].brand);
    }
});

router.get("/menosModelosOld", async (req, res) => {

    const cars = JSON.parse(await fs.readFile("car-list.json", "utf-8"));

    const carsByModelsSize = cars.map(c => ({ brand: c.brand, size: c.models.length }));

    let menosModelos = carsByModelsSize.reduceRight((a, c) => {
        if (!a[0] || c.size == a[0].size) {
            a.push(c);
        } else if (c.size < a[0].size) {
            a = [ c ];
        }

        return a;
    }, []);

    if (menosModelos.size > 1) {
        res.send(menosModelos.map(c => c.brand));
    } else {
        res.send(menosModelos[0].brand);
    }
});

router.get("/menosModelos", async (req, res) => {

    const cars = JSON.parse(await fs.readFile("car-list.json", "utf-8"));

    const carsByModelsSize = cars.sort((a, b) => compare(a.models.length, b.models.length));

    let maisModelos = carsByModelsSize.filter(c => c.models.length === carsByModelsSize[0].models.length);

    if (maisModelos.size > 1) {
        res.send(maisModelos.map(c => c.brand));
    } else {
        res.send(maisModelos[0].brand);
    }
});

router.get("/listaMaisModelos/:x", async (req, res) => {

    const cars = JSON.parse(await fs.readFile("car-list.json", "utf-8"));

    const carsByModelsSize = cars.sort((a, b) => {

        let result = compare(a.models.length, b.models.length) * -1;

        if (result === 0) {
            result = compare(a.brand, b.brand);
        }

        return result;
    });

    res.send(carsByModelsSize.slice(0, parseInt(req.params.x)).map(c => `${c.brand} - ${c.models.length}`));
});

router.get("/listaMenosModelos/:x", async (req, res) => {

    const cars = JSON.parse(await fs.readFile("car-list.json", "utf-8"));

    const carsByModelsSize = cars.sort((a, b) => {

        let result = compare(a.models.length, b.models.length);

        if (result === 0) {
            result = compare(a.brand, b.brand);
        }

        return result;
    });

    res.send(carsByModelsSize.slice(0, parseInt(req.params.x)).map(c => `${c.brand} - ${c.models.length}`));
});

router.post("/listaModelos", async (req, res) => {

    const cars = JSON.parse(await fs.readFile("car-list.json", "utf-8"));

    let car = cars.find(c => c.brand.toLowerCase() === req.body.nomeMarca.toLowerCase());

    res.send(car ? car.models : []);
});

export default router;