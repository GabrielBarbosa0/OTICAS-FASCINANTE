const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (window.lucide) {
  window.lucide.createIcons();
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const leadForm = document.querySelector("#lead-form");
const leadStatus = document.querySelector("#lead-status");

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leadForm);
  const lead = Object.fromEntries(formData.entries());
  lead.createdAt = new Date().toISOString();
  lead.source = "landing_page_pre_atendimento";

  const storedLeads = JSON.parse(localStorage.getItem("oticasFascinanteLeads") || "[]");
  storedLeads.push(lead);
  localStorage.setItem("oticasFascinanteLeads", JSON.stringify(storedLeads));

  leadStatus.textContent = "Recebemos suas informações. Em breve a equipe te chama no WhatsApp para orientar com calma.";
  leadForm.reset();
});
