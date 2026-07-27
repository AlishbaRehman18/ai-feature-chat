const btn = document.getElementById("stateful-btn");

function fakeAsync() {
  return new Promise((resolve, reject) => {
    const delay = 600 + Math.random() * 1200;
    setTimeout(() => {
      Math.random() < 0.2 ? reject() : resolve();
    }, delay);
  });
}

btn.addEventListener("click", async () => {
  btn.className = "loading";

  try {
    await fakeAsync();
    btn.className = "success";
    setTimeout(() => btn.className = "idle", 1200);
  } catch {
    btn.className = "error";
    setTimeout(() => btn.className = "idle", 1500);
  }
});
