# PokéIdle

## Descrição

PokéIdle é um jogo idle de batalha automática em navegador.


## API utilizada e justificativa

- **API:** `https://pokeapi.co/api/v2` (PokeAPI)
- **Justificativa:** a PokeAPI fornece diversos dados públicos sobre Pokémon (sprites, tipos, cadeias de evolução, etc.). O projeto usa esses dados para popular inimigos, sprites e tipagens sem manter uma base própria.


## Instruções de uso

- Abra `index.html` diretamente em um navegador.
- Utilize o botão Atacar para enfraquecer o inimigo.
- Derrote-o para ganhar recursos ou capture-o com o botão Capturar para tentar adicioná-lo a seu time.

## Conceitos de POO implementados e onde encontrá-los no código

- **Objetos literais**
    - `CONFIG` (`scripts/config.js`) constantes globais.
    - `API` (`scripts/api.js`) wrapper de chamadas `fetch` com caches (`POKEMONCACHE`, `POKEMONTYPES`).
    
- **Orientação prototípica**
    - `Pokemon` (`scripts/Pokemon.js`)  modela os pokémons, com `PokemonAlly` e `PokemonEnemy` herdando deste para especializar os objetos.

- **Funções construtoras**
    - `BattleManager` (`scripts/BattleManager.js`) gerencia estado e métodos para batalhas.
    - `Player` (`scripts/Player.js`) gerencia dados do jogador, como seus atributos e time.