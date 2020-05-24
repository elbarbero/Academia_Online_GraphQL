import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { database } from '../data/data.store';

const mutation : IResolvers = {
    Mutation: {
        cursoNuevo (__: void, { curso }): any {
            const itemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            }

            if(database.cursos.filter(c => c.title === itemCurso.title).length === 0){
              database.cursos.push(itemCurso);  
              return itemCurso;
            }else{
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
                }
            }

            
            
        },
        modificarCurso (__:void, { curso }): any {
            const indexItem = _.findIndex(database.cursos, function(o) {
                return o.id === curso.id;
            });

            if (indexItem > -1) {
                const valoraciones = database.cursos[indexItem].reviews;
                curso.reviews = valoraciones;
                database.cursos[indexItem] = curso;
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
        eliminarCurso (__:void, { id }): any {
            const cursoBorrado = _.remove(database.cursos, function(o) {
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
}

export default mutation;