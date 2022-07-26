import { NextApiRequest, NextApiResponse } from "next";

import {prisma} from "../../db/client"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res:NextApiResponse) => {
    
    const slug = req.query["slug"];

    if(!slug || typeof slug !== 'string') {
            res.statusCode = 404;
            res.send(JSON.stringify({message: "ruta no valida"}));

            return;
    }

    const data = await prisma.cliente.findFirst({
        where: {
            rut: {
                equals: slug
            }
        }
    });

    if(!data){
        res.statusCode = 404;
        res.send(JSON.stringify({message: "cliente no encontrado"}));

        return;
    }

    return res.send(data);
}