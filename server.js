import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors'
import https from 'https';
import fs from 'fs';

const port = 6000

const app = express();

const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('localhost.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };


app.use(express.json());
app.use(cors());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    //res.header("Connection", "close");
    next();
});

const httpsServer = https.createServer(credentials, app);

const connection = createConnection({
    host: 'mysql-container',
    user: 'root',
    password: '123',
    database: 'b2b'
});

const connection_pedido = createConnection({
    host: 'mysql-container',
    user: 'root',
    password: '123',
    database: 'pedido'
});
console.log(connection_pedido)
///////////////////////////////////////////////////////////////////
/////////////////////*******PEDIDO******** *///////////////////////
///////////////////////////////////////////////////////////////////
//GET LOGIN
app.post('/api/token', (req, res) => {
    res.send (
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2NTYsInJ1dG9wZXJhZG9yIjo3NjA0NzY1OSwiaW1laSI6IjY0YjU4ZWY0NjM2OTQ3YiJ9LCJpYXQiOjE2OTM0MTY2MzQsImV4cCI6MTY5MzUwMzAzNH0.2JiTZxaDc0YDOh1dyCfgkIUnjHOsSg9EMP96FuMPTvE",
            "expires_in": 86400
        }
    )
});
//GET VERSION
app.post('/api/version', (req, res) => {
    res.send (
        {
            "id": 3,
            "version": 0,
            "fecha": "2020-10-20T03:00:00.000Z"
        }
    )
});
//GET CATALOGO
app.get('/api/catalogo', (req, res) => {
    res.send (
        [
            {
                "id": "CL202",
                "description": "GUMS",
                "articulo": [
                    {
                        "id": "882100",
                        "description": "NIDO 3+ Nutritods LEP Softpack 12x800g",
                        "content": 12,
                        "fraction": "BS",
                        "unit": "CJ",
                        "stock": "553",
                        "ind_infaltable": null,
                        "ind_promocional": null
                    },
                    {
                        "id": "328100",
                        "description": "Leche en polvo NIDO 5 Protectus Bolsa 12 x 800 GRS",
                        "content": 12,
                        "fraction": "BS",
                        "unit": "CJ",
                        "stock": "0",
                        "ind_infaltable": null,
                        "ind_promocional": null
                    },
                    {
                        "id": "882300",
                        "description": "NIDO 5+ Nutritods LEP Tarro  6x16kg",
                        "content": 6,
                        "fraction": "TR",
                        "unit": "CJ",
                        "stock": "201",
                        "ind_infaltable": null,
                        "ind_promocional": null
                    },
                    {
                        "id": "872600",
                        "description": "NIDO 5+ Nutritods LEP Softpack  12x800gCL",
                        "content": 12,
                        "fraction": "BS",
                        "unit": "CJ",
                        "stock": "724",
                        "ind_infaltable": null,
                        "ind_promocional": null
                    }
                ]
            }
        ]
    )
});
//GET activos
app.get('/api/activos', (req, res) => {
    connection_pedido.query('select * from activos', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener activos' });
        } else {
        res.json(results);
        }
    });
});
//GET activos_historia
app.get('/api/activos_historia', (req, res) => {
    connection_pedido.query('select * from activos_historia', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener activos_historia' });
        } else {
        res.json(results);
        }
    });
});
//GET articulos
app.get('/api/articulos', (req, res) => {
    connection_pedido.query('select * from articulos', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener articulos' });
        } else {
        res.json(results);
        }
    });
});
//GET categorias_articulos
app.get('/api/categorias_articulos', (req, res) => {
    connection_pedido.query('select * from categorias_articulos', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener categorias_articulos' });
        } else {
        res.json(results);
        }
    });
});
//GET clientes
app.get('/api/clientes', (req, res) => {
    connection_pedido.query('select * from clientes', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
        } else {
        res.json(results);
        }
    });
});
//GET facturas
app.get('/api/facturas', (req, res) => {
    connection_pedido.query('select * from facturas', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener facturas' });
        } else {
        res.json(results);
        }
    });
});
//GET listanegra
app.get('/api/listanegra', (req, res) => {
    connection_pedido.query('select * from listanegra', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener listanegra' });
        } else {
        res.json(results);
        }
    });
});
//GET locales_clientes
app.get('/api/locales_clientes', (req, res) => {
    connection_pedido.query('select * from locales_clientes', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener locales_clientes' });
        } else {
        res.json(results);
        }
    });
});
//GET master_log
app.get('/api/master_log', (req, res) => {
    connection_pedido.query('select * from master_log', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener master_log' });
        } else {
        res.json(results);
        }
    });
});
//GET notas_credito
app.get('/api/notas_credito', (req, res) => {
    connection_pedido.query('select * from notas_credito', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener notas_credito' });
        } else {
        res.json(results);
        }
    });
});
//GET pedidos
app.get('/api/pedidos', (req, res) => {
    connection_pedido.query('select * from pedidos', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener pedidos' });
        } else {
        res.json(results);
        }
    });
});
//GET pedidos_detalle
app.get('/api/pedidos_detalle', (req, res) => {
    connection_pedido.query('select * from pedidos_detalle', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener pedidos_detalle' });
        } else {
        res.json(results);
        }
    });
});
//GET precio_categoria
app.get('/api/precio_categoria', (req, res) => {
    connection_pedido.query('select * from precio_categoria', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener precio_categoria' });
        } else {
        res.json(results);
        }
    });
});
//GET sqlite_sequence
app.get('/api/sqlite_sequence', (req, res) => {
    connection_pedido.query('select * from sqlite_sequence', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener sqlite_sequence' });
        } else {
        res.json(results);
        }
    });
});
//GET tipo_activo
app.get('/api/tipo_activo', (req, res) => {
    connection_pedido.query('select * from tipo_activo', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener tipo_activo' });
        } else {
        res.json(results);
        }
    });
});
//GET usuarios
app.get('/api/usuarios', (req, res) => {
    connection_pedido.query('select * from usuarios', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
        res.json(results);
        }
    });
});
//GET visit_days
app.get('/api/visit_days', (req, res) => {
    connection_pedido.query('select * from visit_days', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener visit_days' });
        } else {
        res.json(results);
        }
    });
});
///////////////////////////////////////////////////////////////////
/////////////////////*******b2b*********** *///////////////////////
///////////////////////////////////////////////////////////////////
//GET PROMO_detail by ID
app.get('/api/promo_detail/:id', (req, res) => {
    const id = req.params.id
    connection.query('select b.*, a.* from promo_detail a ' +
    'inner join promo b on a.id_promo = b.id ' +
    'where a.id_promo = '+req.params.id+'', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
        res.json(results);
        }
    });
});
//GET PROMO
app.get('/api/promo', (req, res) => {
    connection.query('select * from promo order by id asc', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
        res.json(results);
        }
    });
});
//GET PROMO ACTIVE
app.get('/api/promo_activa', (req, res) => {
    connection.query('select * from promo where estado = true order by id asc', (error, results) => {
        if (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
        res.json(results);
        }
    });
});
// POST NEW PROMO
app.post('/api/promo', (req, res) => {
    const {
        archivo,
        fecha_carga,
        estado,
        cantidad
    } = req.body;
    console.log(archivo)
    
    // Aquí puedes agregar tu lógica para guardar los datos en la base de datos
    connection.query('update promo set estado = false'), (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            console.log(req.body)
            res.json({ message: 'promo actualizada exitosamente', res: results });
        }
    }

    connection.query('insert into promo (archivo,fecha_carga,estado,cantidad) values ("'+archivo+'", "'+fecha_carga+'",'+estado+','+cantidad+')', (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            connection.query('SELECT * FROM promo WHERE id = (SELECT MAX(id) FROM promo)', (error, results) => {
                if (error) {
                    console.log(error)
                    res.status(500).json({ error: 'Error al obtener usuarios' });
                } else {
                    console.log(req.body)
                    res.json({ message: 'promo creada exitosamente', res: results });
                }
            });
            // console.log(req.body)
            // res.json({ message: 'promo creada exitosamente' });
        }
    });
        
  });
// POST NEW PROMO_detail
app.post('/api/promo_detail', (req, res) => {
    const { cant_max,
        cant_min,
        fec_fin,
        fec_ini,
        intervalo_n_prod,
        porcentaje,
        precio_uni_promo,
        n_por_n_a,
        n_por_n_b,
        sku,
        id_promo
     } = req.body;
    console.log(req.body.cant_max)
    // Aquí puedes agregar tu lógica para guardar los datos en la base de datos
    connection.query('insert into promo_detail (cant_max,cant_min,fec_fin,fec_ini,intervalo_n_prod,porcentaje,precio_uni_promo,n_por_n_a,n_por_n_b,sku,id_promo) values ('+cant_max+','+cant_min+',"'+fec_ini+'","'+fec_fin+'",'+intervalo_n_prod+',"'+porcentaje+'",'+precio_uni_promo+','+n_por_n_a+', '+n_por_n_b+', "'+sku+'", '+id_promo+')', (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear detalle de promo' });
        } else {
            console.log(req.body)
            res.json({ message: 'detalle de promo creada exitosamente' });
        }
    });
  });

/*const server = app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });*/

  const server = httpsServer.listen(port, () => {
    console.log(`Servidor HTTPS escuchando en el puerto ${port}`);
  });