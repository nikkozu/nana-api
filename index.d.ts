export default class NanaApi {
    g(query: string): Promise<object>;
    random(): Promise<object>;
    search(keyword: string, page?: number, sort?: string): Promise<object>;
    tags(keyword: string, page?: number, sort?: string): Promise<object>;
    artists(keyword: string, page?: number, sort?: string): Promise<object>;
    characters(keyword: string, page?: number, sort?: string): Promise<object>;
    parodies(keyword: string, page?: number, sort?: string): Promise<object>;
    groups(keyword: string, page?: number, sort?: string): Promise<object>;
}

// export = Nana;