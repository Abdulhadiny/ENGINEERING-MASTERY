import { describe, expect, it } from 'vitest';
import { InMemoryTaskRepository } from '../src/in-memory-repo.ts';

describe('InMemoryTaskRepository', () => {
    it('adds and retrieves a task', async () => {
        const repo = new InMemoryTaskRepository();
        await repo.add({ id: '1', title: 'write task', completed: false, createdAt: new Date() });

        const tasks = await repo.list();
        expect(tasks).toHaveLength(1);
        expect(tasks[0]!.title).toBe('write task');
    });
});
