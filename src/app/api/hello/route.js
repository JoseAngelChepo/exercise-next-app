const dataMockInformativa = {
  name: "Turborepo",
  developer: "Vercel",
  language: ["JavaScript", "TypeScript"],
  implementation_language: "Rust",
  version_info: {
    latest_major: "2.x",
    release_date: "June 4, 2024",
    "end_of_life_for_1.x": "June 4, 2026",
  },
  description:
    "Sistema de build de alto rendimiento especialmente diseñado para monorepos en proyectos JavaScript/TypeScript.",
  core_features: {
    incremental_builds: true,
    local_caching: true,
    remote_caching: true,
    parallel_task_execution: true,
    dependency_graph: true,
    "terminal_ui_2.0": true,
    watch_mode: true,
    code_generation: true,
  },
  platform_support: {
    os: [
      "Linux (Debian‑based)",
      "macOS (Intel y Apple Silicon)",
      "Windows (x64 y ARM64)",
    ],
    package_managers: ["pnpm 8+", "npm 8+", "Yarn 1+", "Bun 1.2+ (beta)"],
    node_support: "Active y Maintenance LTS",
  },
  use_cases: [
    "Repositorios monorepo con múltiples packages/repositorios",
    "Proyectos JavaScript/TypeScript con dependencias compartidas",
    "CI/CD donde se desea compartir caché entre desarrolladores y pipelines",
    "Builds rápidos mediante cacheo distribuido",
    "Migraciones incrementales desde otros monorepo tools",
  ],
  benefits: [
    "Reduce significativamente tiempos de build",
    "Permite trabajos paralelos según árbol de dependencias",
    "Se integra perfectamente con Vercel para caching remoto sin configuración adicional",
    "UI interactiva en terminal para inspeccionar logs y tareas",
    "Modo Watch para desarrollo reactivo",
  ],
};

export async function GET(request) {
  return new Response(JSON.stringify({ data: dataMockInformativa }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
