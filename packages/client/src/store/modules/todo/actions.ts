import { ActionContext, ActionTree } from 'vuex';
import { TodoState, Todo, Data } from './types';
import { RootState } from '@/store/types';
import Axios, { AxiosResponse } from 'axios';


type TodoActionContext = ActionContext<TodoState, RootState>;
type TodoActionTree = ActionTree<TodoState, RootState>;

export const actions: TodoActionTree = {
    async fetchData(context: TodoActionContext): Promise<any> {
        try {
            const response: AxiosResponse = await Axios({
                url: '/todos',
            });
            const payload: Todo[] = response && response.data;
            context.commit('todosLoad', payload);
        } catch (e) {
            context.commit('todosError', e.message);
        } finally {
            // Vue.$log.debug('Desbloquear BlockUI');
        }
    },
    async addTodo(context: TodoActionContext, todo: string): Promise<any> {
        const data: Data = {
            id: Date.now(),
            text: todo,
            done: false,
        };
        try {
            const response: AxiosResponse = await Axios({
                method: 'POST',
                url: '/todos',
                data,
            });
            if (response && response.data) {
                context.dispatch('fetchData');
            }
        } catch (e) {
            context.commit('todosError', e.message);
        } finally {
            // Vue.$log.debug('Desbloquear BlockUI');
        }
    },
    async updateTodoStatus(context: TodoActionContext, todo: Todo): Promise<any> {
        try {
            const response: AxiosResponse = await Axios({
                method: 'PUT',
                url: `/todos/${todo.id}`,
                data: {
                    id: todo.id,
                    text: todo.text,
                    done: !todo.done,
                },
            });
            if (response && response.data) {
                context.dispatch('fetchData');
            }
        } catch (e) {
            context.commit('todosError', e.message);
        } finally {
            // Vue.$log.debug('Desbloquear BlockUI');
        }
    },
    async deleteTodo(context: TodoActionContext, todo: Todo): Promise<any> {
        try {
            const { data } = await Axios({
                method: 'DELETE',
                url: `/todos/${todo.id}`,
            });
            if (data) {
                context.dispatch('fetchData');
            }
        } catch (e) {
            context.commit('todosError', e.message);
        } finally {
            // Vue.$log.debug('Desbloquear BlockUI');
        }
    },
};
