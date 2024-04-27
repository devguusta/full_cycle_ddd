export default interface RepositoryInterface<T> {


    // Get all records
    findAll(): Promise<T[]>;

    // Get record by id
    find(id: string): Promise<T>;

    // Create record
    create(data: T): Promise<void>;

    // Update record
    update(data: T): Promise<void>;

    // Delete record
    delete(id: string): Promise<boolean>;

}