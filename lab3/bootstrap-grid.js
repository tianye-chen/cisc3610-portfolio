document.addEventListener("DOMContentLoaded", () => {
  let progressBar = document.getElementById("progress-bar");
  let progress = document.getElementById("progress");

  if (progress.ariaValueNow < progress.ariaValueMax) {
    progress.ariaValueNow += 99;
    progressBar.style = `width: ${progress.ariaValueNow}%;`;
  }

  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
});
