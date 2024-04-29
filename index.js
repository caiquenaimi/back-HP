const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "harrypotter",
    password: "ds564",
    port: 7007,
});

app.use(express.json());

app.get("/bruxos", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM bruxos");
        res.json({
            status: "sucesso",
            mensagem: "Lista de bruxos",
            quantidade: resultado.rowCount,
            bruxos: resultado.rows,
        });
    } catch (error) {
        console.error("Erro ao buscar bruxos", error);
    }
});

app.get("/bruxos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("SELECT * FROM bruxos WHERE id = $1", [
            id,
        ]);
        if (resultado.rowCount === 0) {
            return res.status(404).send({
                status: "erro",
                mensagem: `Bruxo com id ${id} não encontrado`,
            });
        }

        res.json({
            status: "sucesso",
            mensagem: "Bruxo encontrado",
            bruxo: resultado.rows[0],
        });
    } catch (error) {
        console.error("Erro ao buscar bruxo", error);
    }
});

app.get("/bruxos/casa/:casa", async (req, res) => {
    try {
        const { casa } = req.params;
        const resultado = await pool.query("SELECT * FROM bruxos WHERE LOWER(casa) = $1", [
            casa.toLowerCase(),
        ]);
        if (resultado.rowCount === 0) {
            return res.status(404).send({
                status: "erro",
                mensagem: `Bruxos da casa ${casa} não encontrados`,
            });
        }

        res.json({
            status: "sucesso",
            mensagem: `Bruxos da casa ${casa}`,
            bruxos: resultado.rows,
        });
    } catch (error) {
        console.error("Erro ao buscar bruxos da casa", error);
    }
});

app.get("/bruxos/nome/:nome", async (req, res) => {
    try {
        const { nome } = req.params;
        const resultado = await pool.query(
            "SELECT * FROM bruxos WHERE LOWER(nome) LIKE $1",
            [`%${nome.toLowerCase()}%`]
        );
        if (resultado.rowCount === 0) {
            return res.status(404).send({
                status: "erro",
                mensagem: `Nenhum bruxo encontrado com o nome ${nome}`,
            });
        }

        res.json({
            status: "sucesso",
            mensagem: "Bruxos encontrados",
            bruxos: resultado.rows,
        });
    } catch (error) {
        console.error("Erro ao buscar bruxos", error);
        res.status(500).send({
            status: "erro",
            mensagem: "Erro ao buscar bruxos",
        });
    }
});

app.post("/bruxos", async (req, res) => {
    let sangueArr = ["puro", "mestiço", "trouxa"];
    let casaArr = ["grifinória", "sonserina", "corvinal", "lufa-lufa"];
    let { nome, idade, casa, habilidade, sangue, patrono } = req.body;
    casa = casa.toLowerCase();
    sangue = sangue.toLowerCase();
    try {
        if (!nome || !idade || !casa || !habilidade || !sangue) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Todos os campos são obrigatórios",
            });
        }
        if (idade <= 0) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Idade inválida",
            });
        }
        if (!sangueArr.includes(sangue)) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Tipo de sangue inválido",
            });
        }
        if (!casaArr.includes(casa)) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Casa inválida",
            });
        }


        if (nome.length <= 2) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Nome inválido",
            });
        }

        await pool.query(
            "INSERT INTO bruxos (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nome, idade, casa, habilidade, sangue, patrono]
        );
        res.status(201).send({
            status: "sucesso",
            mensagem: "Bruxo criado com sucesso",
        });
    } catch (error) {
        console.error("Erro ao criar bruxo", error);
        res.status(500).send({
            status: "erro",
            mensagem: "Erro ao criar bruxo",
        });
    }
});

app.put("/bruxos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let sangueArr = ["puro", "mestiço", "trouxa"];
        let casaArr = ["grifinória", "sonserina", "corvinal", "lufa-lufa"];
        let { nome, idade, casa, habilidade, sangue, patrono } = req.body;
        casa = casa.toLowerCase();
        sangue = sangue.toLowerCase();
        if (!nome || !idade || !casa || !habilidade || !sangue) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Todos os campos são obrigatórios",
            });
        }
        if (idade <= 0) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Idade inválida",
            });
        }
        if (!sangueArr.includes(sangue)) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Tipo de sangue inválido",
            });
        }
        if (!casaArr.includes(casa)) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Casa inválida",
            });
        }

        if (nome.length <= 2) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Nome inválido",
            });
        }

        await pool.query(
            "UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, sangue = $5, patrono = $6 WHERE id = $7",
            [nome, idade, casa, habilidade, sangue, patrono, id]
        );
        res.status(200).send({
            status: "sucesso",
            mensagem: "Bruxo atualizado com sucesso",
        });
    } catch (error) {
        console.error("Erro ao atualizar bruxo", error);
        res.status(400).send({
            status: "erro",
            mensagem: "Erro ao atualizar bruxo",
        });
    }
});

app.delete("/bruxos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("DELETE FROM bruxos WHERE id = $1", [
            id,
        ]);
        if (resultado.rowCount === 0) {
            return res.status(404).send({
                status: "erro",
                mensagem: `Bruxo com id ${id} não encontrado`,
            });
        }
        res.status(200).send({
            status: "sucesso",
            mensagem: "Bruxo deletado com sucesso",
        });
    } catch (error) {
        console.error("Erro ao deletar bruxo", error);
        res.status(400).send({
            status: "erro",
            mensagem: "Erro ao deletar bruxo",
        });
    }
});

/*ENDPOINTS Varinhas*/

app.get("/varinhas", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM varinhas");
        res.json({
            status: "sucesso",
            mensagem: "Lista de varinhas",
            quantidade: resultado.rowCount,
            varinhas: resultado.rows,
        });
    } catch (error) {
        console.error("Erro ao buscar varinhas", error);
    }
});

app.get("/varinhas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("SELECT * FROM varinhas WHERE id = $1", [
            id,
        ]);
        if (resultado.rowCount === 0) {
            return res.status(404).send({
                status: "erro",
                mensagem: `Varinha com id ${id} não encontrada`,
            });
        }
        res.json({
            status: "sucesso",
            mensagem: "Varinha encontrada",
            varinha: resultado.rows[0],
        });
    } catch (error) {
        console.error("Erro ao buscar varinha", error);
    }
});

app.post("/varinhas", async (req, res) => {
    const { material, comprimento, nucleo, data_criacao } = req.body;

    if (!material || !comprimento || !nucleo || !data_criacao) {
        return res.status(400).send({
            status: "erro",
            mensagem: "Todos os campos são obrigatórios",
        });
    }

    try {
        await pool.query(
            "INSERT INTO varinhas (material, comprimento, nucleo, data_criacao) VALUES ($1, $2, $3, $4) RETURNING *",
            [material, comprimento, nucleo, data_criacao]
        );
        res.status(201).send({
            status: "sucesso",
            mensagem: "Varinha criada com sucesso",
        });
    } catch (error) {
        console.error("Erro ao criar varinha", error);
        res.status(500).send({
            status: "erro",
            mensagem: "Erro ao criar varinha",
        });
    }
});

app.put("/varinhas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_criacao } = req.body;
        if (!material || !comprimento || !nucleo || !data_criacao) {
            return res.status(400).send({
                status: "erro",
                mensagem: "Todos os campos são obrigatórios",
            });
        }
        await pool.query(
            "UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_criacao = $4 WHERE id = $5",
            [material, comprimento, nucleo, data_criacao, id]
        );
        res.status(200).send({
            status: "sucesso",
            mensagem: "Varinha atualizada com sucesso",
        });
    } catch (error) {
        console.error("Erro ao atualizar varinha", error);
        res.status(400).send({
            status: "erro",
            mensagem: "Erro ao atualizar varinha",
        });
    }
});

app.delete("/varinhas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("DELETE FROM varinhas WHERE id = $1", [
            id,
        ]);
        if (resultado.rowCount === 0) {
            return res.status(404).send({
                status: "erro",
                mensagem: `Varinha com id ${id} não encontrada`,
            });
        }
        res.status(200).send({
            status: "sucesso",
            mensagem: "Varinha deletada com sucesso",
        });
    } catch (error) {
        console.error("Erro ao deletar varinha", error);
        res.status(400).send({
            status: "erro",
            mensagem: "Erro ao deletar varinha",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
