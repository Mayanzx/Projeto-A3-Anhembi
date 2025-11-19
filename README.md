# Site do Jogo (Bootstrap + Responsivo)

Este projeto é um site one-page com foco em estética moderna, performance e responsividade. Ele usa Bootstrap 5 via CDN e estilos customizados.

## Como usar

1. Abra `index.html` no navegador (sem build).
2. Substitua os placeholders de imagens em `assets/img/` pelas suas artes e screenshots.
3. Edite os textos em cada seção do `index.html`.
4. Ajuste a paleta em `assets/css/custom.css` (variáveis no `:root`).

## Seções

- Hero com título, call-to-actions e arte principal
- Trailer (iframe YouTube/Vimeo)
- História/Lore com bullet points
- Recursos (cards com badges gradientes)
- Screenshots (carrossel Bootstrap)
- Roadmap (linha do tempo)
- Devlog (teaser renderizado por JS)
- FAQ (accordion)
- Newsletter/Contato (mock front-end)
- Footer com sociais

## Personalização visual

- Tipografia: Montserrat (títulos) e Inter (texto). Altere no `<head>`.
- Cores: variáveis CSS em `:root` (`--bg`, `--surface`, `--primary`, etc.).
- Efeitos: vidro (glass), gradientes animáveis, grid sutil no hero.

## Acessibilidade

- Navegação por teclado, foco visível herdado do Bootstrap.
- `aria-label`, `aria-live` e `alt` nas mídias.

## Próximos passos sugeridos

- Integrar formulário de newsletter com um backend (Firebase, Formspree, Supabase, etc.).
- Adicionar página de Press Kit com logos, banners e factsheet.
- Incluir seção Equipe e Créditos.
- Internacionalização (i18n) com arquivos de tradução simples.
- Otimizar assets (WebP/AVIF) e metas de SEO (Open Graph/Twitter Cards).