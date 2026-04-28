# Plan de Implementación — FastRecord (Pendientes)

> **Para:** Agente ejecutor (Gemini)
> **Para revisión posterior:** Claude
> **Estado:** Solo quedan estos 6 puntos pendientes. El resto del plan ya está aplicado.

---

## Reglas generales

1. **No tocar** `img/ft1.jpg`, `img/ft1.webp` (es del usuario), ni `canflowers.html` / `canflowers.js` / `img/canflowers/`.
2. Mantener clases CSS y estructura existente.
3. Después de cambiar, validar que la página carga sin errores 404.

---

## 1. Añadir `name="rgpd"` al checkbox de consentimiento

**Problema:** sin el atributo `name`, Formspree no recibirá el consentimiento RGPD.

**Archivo:** [index.html:674](index.html#L674)

**Cambio:** sustituir
```html
<input type="checkbox" id="gdpr" required>
```
por:
```html
<input type="checkbox" id="gdpr" name="rgpd" required>
```

---

## 2. Borrar `img/ft2.webp` (huérfano)

**Problema:** el original `ft2.png` ya se eliminó, pero el WebP generado quedó sin uso (no se referencia en `index.html`).

**Acción:** borrar el archivo `img/ft2.webp`.

> Verificar primero que no se referencia en ninguna parte:
> ```bash
> grep -r "ft2" --include="*.html" --include="*.css" --include="*.js" .
> ```
> Si solo aparece en `canflowers.js` con sufijo (`casaexteriorft2.webp`, etc., que están en `img/canflowers/`), es seguro borrar.

---

## 3. Traducir `alt` de la imagen de Ibiza a español

**Archivo:** [index.html:488](index.html#L488)

**Cambio:** sustituir
```html
alt="Ibiza sunset view"
```
por:
```html
alt="Atardecer en Ibiza"
```

---

## 4. Mover estilos inline del footer legal a `index.css`

**Problema:** Gemini metió `style="..."` directo en el HTML. Funciona pero rompe la separación de concerns.

**Archivo:** [index.html:738](index.html#L738)

**Cambio en `index.html`:** sustituir
```html
<div class="footer__legal" style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem; font-size: var(--smaller-font-size);">
```
por:
```html
<div class="footer__legal">
```

**Añadir al final de `index.css`:**
```css
.footer__legal {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: var(--smaller-font-size);
}
```

---

## 5. Añadir estilos para el checkbox RGPD

**Problema:** el HTML usa la clase `form__gdpr` pero no existe ningún estilo para ella, por lo que el checkbox + label probablemente se vean desalineados o feos.

**Archivo:** [index.css](index.css) (al final del archivo)

**Añadir:**
```css
.form__gdpr {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: var(--small-font-size);
    color: var(--text-color);
}

.form__gdpr input[type="checkbox"] {
    margin-top: 4px;
    width: auto;
    cursor: pointer;
    flex-shrink: 0;
}

.form__gdpr label {
    cursor: pointer;
    line-height: 1.4;
}

.form__gdpr a {
    color: var(--primary-color);
    text-decoration: underline;
}
```

> **Verificar en navegador:** abrir `index.html`, ir a la sección Contacto y comprobar que el checkbox y el texto están alineados horizontalmente y se ven bien.

---

## 6. Arreglar link "Madrid" roto del footer

**Problema:** `<a href="#">` apunta a la nada (link muerto).

**Archivo:** [index.html:718](index.html#L718)

**Cambio:** sustituir
```html
<li><a href="#" class="footer__link">Madrid</a></li>
```
por:
```html
<li><a href="#contact" class="footer__link">Madrid</a></li>
```

---

## Checklist final (para Claude al revisar)

- [ ] Checkbox RGPD tiene `name="rgpd"` y se envía a Formspree
- [ ] `img/ft2.webp` eliminado
- [ ] `alt` de la imagen de Ibiza está en español
- [ ] El estilo inline del `footer__legal` ya no existe; está en `index.css`
- [ ] El checkbox RGPD se ve correctamente alineado en pantalla (clase `.form__gdpr` con estilos)
- [ ] El link "Madrid" del footer apunta a `#contact` (o sección real)
- [ ] La página carga sin errores 404 ni warnings nuevos en consola

---

## Qué hacer si algo se rompe

- Si tras añadir `.form__gdpr` el checkbox sigue desalineado, **no inventes** estilos extra. Reporta lo que ves para revisión humana.
- Si Formspree no recibe el campo `rgpd`, comprobar primero que el `<input>` tiene el atributo `name="rgpd"` antes de tocar nada más.
