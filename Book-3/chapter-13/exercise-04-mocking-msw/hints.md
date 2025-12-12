# Exercise 4: Mocking with MSW - Hints

## MSW Setup

<details>
<summary>💡 Hint: Basic MSW handler</summary>

```javascript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ id, name: `User ${id}` });
  }),
];
```
</details>

<details>
<summary>💡 Hint: Overriding handlers in tests</summary>

```javascript
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

test('handles 404', async () => {
  server.use(
    http.get('/api/users/999', () => {
      return new HttpResponse(null, { status: 404 });
    })
  );

  render(<UserProfile id={999} />);
  expect(await screen.findByText(/not found/i)).toBeInTheDocument();
});
```
</details>

---

**Check the solution folder for complete MSW setup!**

