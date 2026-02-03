# Vietri: Maestri della Ceramica

Un gioco da tavolo gestionale ambientato nella splendida costiera amalfitana.

## Sviluppo Locale

Questo progetto utilizza **Vite** per la gestione degli asset e la build.

1.  **Installazione dipendenze:**
    ```bash
    npm install
    ```

2.  **Avvio ambiente di sviluppo:**
    ```bash
    npm run dev
    ```
    Apri il link mostrato nel terminale (solitamente `http://localhost:5173`).

## Gestione Immagini Editor

Le immagini per l'editor delle carte si trovano nella cartella `opere/`.
Il sistema le rileva automaticamente: basta aggiungere o rimuovere file PNG in quella cartella e l'editor si aggiornerà da solo.

## Pubblicazione (Deployment)

Il progetto è configurato per essere pubblicato su **GitHub Pages**.

### Metodo Automatico (Consigliato)
Ogni volta che fai un **push** sul branch `main`, una GitHub Action eseguirà automaticamente la build e pubblicherà il sito. Assicurati che nelle impostazioni della repository su GitHub, alla voce **Pages**, la sorgente sia impostata su `gh-pages`.

### Metodo Manuale
Se preferisci farlo a mano:
1.  Esegui `npm run build`
2.  Carica il contenuto della cartella `dist` sul tuo spazio web.
