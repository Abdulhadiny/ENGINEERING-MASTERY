import { describe, it, expect, afterEach } from 'vitest';
import { FileTaskRepository } from '../src/json-repo.ts';
import { promises as fs } from 'node:fs';
import os from 'node:os';

describe('FileTaskRepository', () => {
    afterEach(async () => {
        try {
            await fs.unlink(os.tmpdir() + '/db.json');
        } catch (error) {
            // Ignore file not found error
        }
    });

    it('adds and retrieves a task', async () => {
        const repo = new FileTaskRepository(os.tmpdir() + '/db.json');
        await repo.add({ id: '1', title: 'write task', completed: false, createdAt: new Date() });

        const tasks = await repo.list();
        expect(tasks).toHaveLength(1);
        expect(tasks[0]!.title).toBe('write task');
    });
});