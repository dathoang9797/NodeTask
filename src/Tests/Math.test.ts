import {add,calculateTip} from '@App/App/math'

test("Should calculate total tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate total tip with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(15);
});

test("Should calculate total tip with default tip - Async", done => {
  setTimeout(() => {
    const total = calculateTip(10);
    expect(total).toBe(15);
    done();
  }, 1000);
});

test("Should calculate total tip with default tip - Async", async () => {
  const total = await add(10, 1);
  expect(total).toBe(11);
});