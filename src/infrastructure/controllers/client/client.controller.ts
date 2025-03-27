import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ClientPresenter } from './client.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AddClientDto, UpdateClientDto } from './client.dto';
import { addClientUseCases } from "../../../usecases/client/addClient.usecases"
import { GetClientUseCases } from "../../../usecases/client/getClient.usecases"
import { GetClientAllUseCases } from "../../../usecases/client/getClients.usecases"
import { updateClientUseCases } from "../../../usecases/client/updateClient.usecases"
import { deleteClientUseCases } from "../../../usecases/client/deleteClient.usecases"


@Controller('client')
@ApiTags('client')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ClientPresenter)
export class ClientController {
  constructor(
    @Inject(UsecasesProxyModule.GET_CLIENT_USECASE_PROXY)
    private readonly getTodoUsecaseProxy: UseCaseProxy<GetClientUseCases>,
    @Inject(UsecasesProxyModule.GET_CLIENT_ALL_USECASE_PROXY)
    private readonly getAllTodoUsecaseProxy: UseCaseProxy<GetClientAllUseCases>,
    @Inject(UsecasesProxyModule.PUT_CLIENT_USECASE_PROXY)
    private readonly updateTodoUsecaseProxy: UseCaseProxy<updateClientUseCases>,
    @Inject(UsecasesProxyModule.DELETE_CLIENT_USECASE_PROXY)
    private readonly deleteTodoUsecaseProxy: UseCaseProxy<deleteClientUseCases>,
    @Inject(UsecasesProxyModule.POST_CLIENT_USECASE_PROXY)
    private readonly addTodoUsecaseProxy: UseCaseProxy<addClientUseCases>,
  ) { }

  @Get('unique')
  @ApiResponseType(ClientPresenter, false)
  async getClient(@Query('id', ParseIntPipe) id: number) {
    const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
    return new ClientPresenter(todo);
  }

  @Get('all')
  @ApiResponseType(ClientPresenter, true)
  async getClients() {
    const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
    return todos.map((todo) => new ClientPresenter(todo));
  }

  @Put('put')
  @ApiResponseType(ClientPresenter, true)
  async updateClient(@Body() updateTodoDto: UpdateClientDto) {
    const { id } = updateTodoDto;
    await this.updateTodoUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Delete('delete')
  @ApiResponseType(ClientPresenter, true)
  async deleteClient(@Query('id', ParseIntPipe) id: number) {
    await this.deleteTodoUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('post')
  @ApiResponseType(ClientPresenter, true)
  async addClient(@Body() addClient: AddClientDto) {
    const clientCreated = await this.addTodoUsecaseProxy.getInstance().execute(addClient);
    return new ClientPresenter(clientCreated);
  }
}