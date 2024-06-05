import { Inject, Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    private todosRepository: TodosRepository,
    @Inject('ACCESS_TOKEN') private accessToken: string,
    @InjectRepository(Todo)
    private todosDbRepository: Repository<Todo>,
  ) {}
  // getTodos() {
  //   return this.accessToken === 'ESTA ES MI CLAVE SECRETA'
  //     ? this.todosRepository.getTodo()
  //     : 'No tiene acceso a esta información';
  // }
  getTodos() {
    return this.todosDbRepository.find({
      relations: ['files'],
    });
  }

  findById(id: number) {
    return this.todosDbRepository.findOne({
      where: { id },
      relations: ['files'],
    });
  }

  create(todo: Omit<Todo, 'id'>) {
    return this.todosDbRepository.save(todo);
  }
}
