import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { GetTodoUseCases } from '../../../usecases/todo/getTodo.usecases';
import { ClientPresenter } from './client.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { getTodosUseCases } from '../../../usecases/todo/getTodos.usecases';
import { updateTodoUseCases } from '../../../usecases/todo/updateTodo.usecases';
import { AddClientDto, UpdateClientDto } from './client.dto';
import { deleteTodoUseCases } from '../../../usecases/todo/deleteTodo.usecases';
import { addTodoUseCases } from '../../../usecases/todo/addTodo.usecases';

@Controller('client')
@ApiTags('client')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ClientPresenter)
export class ClientController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TODO_USECASES_PROXY)
    private readonly getTodoUsecaseProxy: UseCaseProxy<GetTodoUseCases>,
    @Inject(UsecasesProxyModule.GET_TODOS_USECASES_PROXY)
    private readonly getAllTodoUsecaseProxy: UseCaseProxy<getTodosUseCases>,
    @Inject(UsecasesProxyModule.PUT_TODO_USECASES_PROXY)
    private readonly updateTodoUsecaseProxy: UseCaseProxy<updateTodoUseCases>,
    @Inject(UsecasesProxyModule.DELETE_TODO_USECASES_PROXY)
    private readonly deleteTodoUsecaseProxy: UseCaseProxy<deleteTodoUseCases>,
    @Inject(UsecasesProxyModule.POST_TODO_USECASES_PROXY)
    private readonly addTodoUsecaseProxy: UseCaseProxy<addTodoUseCases>,
  ) { }

  @Get('client')
  @ApiResponseType(ClientPresenter, false)
  async getClient(@Query('id', ParseIntPipe) id: number) {
    const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
    return new ClientPresenter(todo);
  }

  @Get('clients')
  @ApiResponseType(ClientPresenter, true)
  async getClients() {
    const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
    return todos.map((todo) => new ClientPresenter(todo));
  }

  @Put('client')
  @ApiResponseType(ClientPresenter, true)
  async updateClient(@Body() updateTodoDto: UpdateClientDto) {
    const { id } = updateTodoDto;
    await this.updateTodoUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Delete('client')
  @ApiResponseType(ClientPresenter, true)
  async deleteClient(@Query('id', ParseIntPipe) id: number) {
    await this.deleteTodoUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('client')
  @ApiResponseType(ClientPresenter, true)
  async addClient(@Body() addClient: AddClientDto) {
    const { content } = addClient;
    const clientCreated = await this.addTodoUsecaseProxy.getInstance().execute(content);
    return new ClientPresenter(clientCreated);
  }
}