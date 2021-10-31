-- CreateTable
CREATE TABLE `cat_ant_patologicos_paciente` (
    `id_paciente` VARCHAR(20) NOT NULL,
    `id_antecedente_patologico` VARCHAR(5) NOT NULL,
    `descripcion` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id_paciente`, `id_antecedente_patologico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_aplicadores` (
    `id_aplicador` VARCHAR(5) NOT NULL,
    `id_tipo_aplicador` VARCHAR(5) NOT NULL,
    `numero` VARCHAR(5) NOT NULL,
    `color` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id_aplicador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_catalogos_simples` (
    `nombre_campo` VARCHAR(50) NOT NULL,
    `valor_campo` VARCHAR(5) NOT NULL,
    `status_valor` VARCHAR(1) NOT NULL,
    `nombre_valor` VARCHAR(100) NOT NULL,
    `descripcion_valor` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`nombre_campo`, `valor_campo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_consumibles` (
    `id_consumible` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `id_tipo_consumible` VARCHAR(5) NOT NULL,
    `id_laboratorio` VARCHAR(20) NOT NULL,
    `costo_actual` DECIMAL(10, 2) NOT NULL,
    `fecha_ult_act_costo` DATE NULL,

    PRIMARY KEY (`id_consumible`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_consumibles_procedimiento` (
    `id_procedimiento` VARCHAR(20) NOT NULL,
    `id_consumible` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_procedimiento`, `id_consumible`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_diagnosticos_medicos` (
    `id_diagnostico` VARCHAR(5) NOT NULL,
    `id_zona` VARCHAR(5) NOT NULL,
    `id_estigma` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `niveles` VARCHAR(1) NOT NULL,
    `orden` SMALLINT NOT NULL,

    PRIMARY KEY (`id_diagnostico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_estigmas` (
    `id_estigma` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `puntos_totales` SMALLINT NOT NULL,

    PRIMARY KEY (`id_estigma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_fotos_paciente` (
    `id_paciente` VARCHAR(20) NOT NULL,
    `id_foto` VARCHAR(50) NOT NULL,
    `foto` BLOB NULL,

    PRIMARY KEY (`id_paciente`, `id_foto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_laboratorios` (
    `id_laboratorio` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `nombre_contacto` VARCHAR(100) NOT NULL,
    `direccion` VARCHAR(300) NOT NULL,
    `telefono1` VARCHAR(20) NOT NULL,
    `telefono2` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_laboratorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_lotes_consumible` (
    `id_consumible` VARCHAR(20) NOT NULL,
    `id_lote` VARCHAR(20) NOT NULL,
    `fecha_caducidad` DATE NULL,
    `id_forma_farmaceutica` VARCHAR(5) NOT NULL,
    `id_funcion_inyectable` VARCHAR(5) NOT NULL,
    `id_envase_compra` VARCHAR(5) NOT NULL,
    `unidades_inv_x_envase_compra` SMALLINT NOT NULL,
    `status_lote` VARCHAR(1) NOT NULL,
    `unidades_adm_x_unidad_inv` SMALLINT NOT NULL,
    `id_unidad_administracion` VARCHAR(5) NOT NULL,
    `comentarios` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id_consumible`, `id_lote`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_musculos` (
    `id_musculo` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `html_id` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_musculo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_pacientes` (
    `id_paciente` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefono_movil` VARCHAR(20) NOT NULL,
    `telefono_fijo` VARCHAR(20) NOT NULL,
    `fecha_nacimiento` DATE NULL,
    `deportista` VARCHAR(1) NOT NULL,
    `fumador` VARCHAR(1) NOT NULL,
    `alcohol` VARCHAR(1) NOT NULL,
    `grosor_piel` VARCHAR(30) NOT NULL,
    `intensidad_grosor_piel` VARCHAR(30) NOT NULL,
    `color_piel` VARCHAR(30) NOT NULL,
    `intensidad_color_piel` VARCHAR(30) NOT NULL,
    `enviar_notificaciones` VARCHAR(1) NOT NULL,
    `enfermedades_piel` VARCHAR(300) NOT NULL,
    `motivacion_tratamiento` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id_paciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_procedimientos` (
    `id_procedimiento` VARCHAR(20) NOT NULL,
    `id_tipo_procedimiento` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_procedimientos_diagnostico` (
    `id_diagnostico` VARCHAR(5) NOT NULL,
    `id_procedimiento` VARCHAR(20) NOT NULL,
    `primario` VARCHAR(1) NOT NULL,

    PRIMARY KEY (`id_diagnostico`, `id_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_signos_sintomas` (
    `id_sigo_sintoma` VARCHAR(5) NOT NULL,
    `id_zona` VARCHAR(5) NOT NULL,
    `id_estigma` VARCHAR(5) NOT NULL,
    `id_diagnostico` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `orden` SMALLINT NOT NULL,

    PRIMARY KEY (`id_sigo_sintoma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_subzonas` (
    `id_subzona` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `html_id` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_subzona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat_usuarios` (
    `id_usuario` VARCHAR(20) NOT NULL,
    `id_rol` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cfg_parametros` (
    `unidad_negocio` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `metodo_costeo_inv` VARCHAR(5) NOT NULL,
    `idioma` VARCHAR(5) NOT NULL,
    `nombre_contacto` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`unidad_negocio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_consultas` (
    `id_consulta` VARCHAR(20) NOT NULL,
    `id_tipo_consulta` VARCHAR(5) NOT NULL,
    `id_paciente` VARCHAR(20) NOT NULL,
    `status_consulta` VARCHAR(5) NOT NULL,
    `fecha` DATETIME(0) NULL,
    `programada` VARCHAR(1) NOT NULL,
    `fecha_programacion` DATETIME(0) NULL,
    `comentarios` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id_consulta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_consumibles_consulta` (
    `id_consulta` VARCHAR(20) NOT NULL,
    `id_procedimiento` VARCHAR(20) NOT NULL,
    `id_consumible` VARCHAR(20) NOT NULL,
    `id_aplicador` VARCHAR(5) NOT NULL,
    `id_musculo` VARCHAR(5) NOT NULL,
    `id_subzona` VARCHAR(5) NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id_consulta`, `id_procedimiento`, `id_consumible`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_diagnosticos_consulta` (
    `id_consulta` VARCHAR(20) NOT NULL,
    `id_diagnostico` VARCHAR(5) NOT NULL,
    `id_nivel` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id_consulta`, `id_diagnostico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_entradas_inv` (
    `id_entrada` VARCHAR(20) NOT NULL,
    `id_consumible` VARCHAR(20) NOT NULL,
    `id_lote` VARCHAR(20) NOT NULL,
    `id_tipo_entrada` VARCHAR(5) NOT NULL,
    `fecha_entrada` DATE NULL,
    `id_unidad_entrada` VARCHAR(5) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `id_laboratorio` VARCHAR(20) NOT NULL,
    `documento_entrada` VARCHAR(20) NOT NULL,
    `fecha_doc_entrada` DATE NULL,
    `factura` VARCHAR(20) NOT NULL,
    `fecha_factura` DATE NULL,
    `id_usuario` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_consumible`, `id_lote`, `id_entrada`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_fotos_consulta` (
    `id_consulta` VARCHAR(20) NOT NULL,
    `id_foto` VARCHAR(50) NOT NULL,
    `foto` BLOB NULL,

    PRIMARY KEY (`id_consulta`, `id_foto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_inventario` (
    `id_consumible` VARCHAR(20) NOT NULL,
    `id_lote` VARCHAR(20) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `cantidad_disponible` INTEGER NOT NULL,

    PRIMARY KEY (`id_consumible`, `id_lote`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_procedimientos_consulta` (
    `id_consulta` VARCHAR(20) NOT NULL,
    `id_procedimiento` VARCHAR(20) NOT NULL,
    `status_procedimiento` VARCHAR(1) NOT NULL,
    `num_apariciones` SMALLINT NOT NULL,
    `propuesto_por` VARCHAR(1) NOT NULL,
    `comentarios` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id_consulta`, `id_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_salidas_inv` (
    `id_salida` VARCHAR(20) NOT NULL,
    `id_consumible` VARCHAR(20) NOT NULL,
    `id_lote` VARCHAR(20) NOT NULL,
    `id_tipo_salida` VARCHAR(5) NOT NULL,
    `fecha_salida` DATE NULL,
    `id_unidad_salida` VARCHAR(5) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `id_consulta` VARCHAR(20) NOT NULL,
    `documento_salida` VARCHAR(20) NOT NULL,
    `id_usuario` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_consumible`, `id_lote`, `id_salida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tra_signos_sintomas_consulta` (
    `id_consulta` VARCHAR(20) NOT NULL,
    `id_signo_sintoma` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id_consulta`, `id_signo_sintoma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `sku` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
