"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const data_store_1 = require("../data/data.store");
const mutation = {
    Mutation: {
        cursoNuevo(__, { curso }) {
            const itemCurso = {
                id: String(data_store_1.database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            };
            if (data_store_1.database.cursos.filter(c => c.title === itemCurso.title).length === 0) {
                data_store_1.database.cursos.push(itemCurso);
                return itemCurso;
            }
            else {
                return {
                    id: '-1',
                    title: `El curso ${itemCurso.title} ya existe`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                };
            }
        },
        modificarCurso(__, { curso }) {
            const indexItem = lodash_1.default.findIndex(data_store_1.database.cursos, function (o) {
                return o.id === curso.id;
            });
            if (indexItem > -1) {
                const valoraciones = data_store_1.database.cursos[indexItem].reviews;
                curso.reviews = valoraciones;
                data_store_1.database.cursos[indexItem] = curso;
                return curso;
            }
            return {
                id: '-1',
                title: `El curso con el id ${curso.id} no existe en la BBDD`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            };
        },
        eliminarCurso(__, { id }) {
            const cursoBorrado = lodash_1.default.remove(data_store_1.database.cursos, function (o) {
                return o.id === id;
            });
            if (cursoBorrado[0] === undefined) {
                return {
                    id: '-1',
                    title: `El curso no se puede borrar. No existe el curso con id ${id} en la BBDD`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                };
            }
            return cursoBorrado[0];
        }
    }
};
exports.default = mutation;
