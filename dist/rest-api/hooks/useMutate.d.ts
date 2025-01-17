import { MutateRequest, MutateResponse, OperationType, RelationOperation } from '../types/mutate';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
type RelationsMap<TAttributes, TRelations, TRelationAttributesMap extends Record<keyof TRelations, unknown>> = Partial<Record<keyof TRelations, RelationOperation<TAttributes, TRelations, TRelationAttributesMap> | Array<RelationOperation<TAttributes, TRelations, TRelationAttributesMap>>>>;
interface UseMutateRequestParams<TAttributes, TRelations, TRes, TRelationAttributesMap extends Record<keyof TRelations, unknown>> {
    requestFn: (request: MutateRequest<TAttributes, TRelations, TRelationAttributesMap>) => Promise<MutateResponse<TRes>>;
    options?: MutateOptions<TAttributes, TRelations, TRes, TRelationAttributesMap>;
}
type MutateOptions<TAttributes, TRelations, TRes, TRelationAttributesMap extends Record<keyof TRelations, unknown>> = Omit<UseMutationOptions<MutateResponse<TRes>, Error, MutateRequest<TAttributes, TRelations, TRelationAttributesMap>>, "mutationFn">;
type Return<TAttributes, TRelations, TRes, TRelationAttributesMap extends Record<keyof TRelations, unknown>> = UseMutationResult<MutateResponse<TRes>, Error, MutateRequest<TAttributes, TRelations, TRelationAttributesMap>> & {
    createMutateRequest: (operation: OperationType, attributes: Partial<TAttributes>, key?: number, relations?: RelationsMap<TAttributes, TRelations, TRelationAttributesMap>) => MutateRequest<TAttributes, TRelations, TRelationAttributesMap>;
};
export declare function useMutate<TAttributes, TRelations, TRes, TRelationAttributesMap extends Record<keyof TRelations, unknown>>({ requestFn, options, }: UseMutateRequestParams<TAttributes, TRelations, TRes, TRelationAttributesMap>): Return<TAttributes, TRelations, TRes, TRelationAttributesMap>;
export {};
