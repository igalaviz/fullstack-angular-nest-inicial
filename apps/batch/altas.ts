import { PrismaClient, cat_pacientes } from "@prisma/client";

let dataPacienteActual: cat_pacientes = {
  id_paciente: "1",
  nombre: "Doña Vanidosa",
  email: "vanidad@gmail.com",
  telefono_movil: "12345",
  telefono_fijo: "12345",
  fecha_nacimiento: new Date(1980, 8, 18),
  deportista: "S",
  fumador: "N",
  alcohol: "N",
  grosor_piel: "D",
  intensidad_grosor_piel: "A",
  color_piel: "Blanca",
  intensidad_color_piel: "A",
  enviar_notificaciones: "S",
  enfermedades_piel: "S",
  motivacion_tratamiento: "Vanidad",
};

const prisma = new PrismaClient();

async function main() {
  const cat_pacientes = await prisma.cat_pacientes.create({
    data: dataPacienteActual,
  });
  console.log(cat_pacientes);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
