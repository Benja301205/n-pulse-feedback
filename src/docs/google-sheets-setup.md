
# 📊 Configuración de Google Sheets con Apps Script

## Paso 1: Crear el Google Apps Script

1. Ve a [script.google.com](https://script.google.com)
2. Haz clic en "Nuevo proyecto"
3. Reemplaza el código con el siguiente:

```javascript
function doGet() {
  // ID de tu Google Sheet (de la URL)
  const SHEET_ID = 'TU_SHEET_ID_AQUI';
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Ejemplo: leer datos específicos de las celdas
    const data = {
      probabilidadVolver: parseFloat(sheet.getRange('B2').getValue()) || 0,
      calificacionLugar: parseFloat(sheet.getRange('B3').getValue()) || 0,
      calificacionComida: parseFloat(sheet.getRange('B4').getValue()) || 0,
      experienciaMentores: parseFloat(sheet.getRange('B5').getValue()) || 0,
      calificacionMiniGames: parseFloat(sheet.getRange('B6').getValue()) || 0,
      calificacionConsigna: parseFloat(sheet.getRange('B7').getValue()) || 0,
      dinamicaPitch: parseFloat(sheet.getRange('B8').getValue()) || 0,
      decisionJueces: parseFloat(sheet.getRange('B9').getValue()) || 0,
      nps_global: parseInt(sheet.getRange('B10').getValue()) || 0,
      análisis_detallado: {
        executive_summary: {
          key_message: sheet.getRange('B11').getValue() || "Análisis desde Google Sheets",
          trend: sheet.getRange('B12').getValue() || "estable",
          overall_health_score: parseFloat(sheet.getRange('B13').getValue()) || 7.0
        },
        pattern_analysis: {
          recurring_themes: [
            {
              theme: sheet.getRange('B14').getValue() || "TEMA_PRINCIPAL",
              frequency: sheet.getRange('B15').getValue() || "50%",
              sentiment: parseFloat(sheet.getRange('B16').getValue()) || 0.5,
              impact: sheet.getRange('B17').getValue() || "positivo"
            }
          ]
        },
        segment_analysis: {
          high_engaged: {
            percentage: parseInt(sheet.getRange('B18').getValue()) || 40,
            avg_nps: parseFloat(sheet.getRange('B19').getValue()) || 8.0
          },
          at_risk: {
            percentage: parseInt(sheet.getRange('B20').getValue()) || 20,
            avg_nps: parseFloat(sheet.getRange('B21').getValue()) || 5.0
          }
        }
      }
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Paso 2: Configurar tu Google Sheet

Crea un Google Sheet con esta estructura:

| A | B |
|---|---|
| Métrica | Valor |
| probabilidadVolver | 4.2 |
| calificacionLugar | 4.5 |
| calificacionComida | 4.1 |
| experienciaMentores | 4.7 |
| calificacionMiniGames | 3.8 |
| calificacionConsigna | 4.0 |
| dinamicaPitch | 4.3 |
| decisionJueces | 3.9 |
| nps_global | 45 |
| key_message | Evento exitoso con excelente participación |
| trend | mejorando |
| overall_health_score | 7.8 |
| tema_principal | NETWORKING_VALIOSO |
| frecuencia | 76% |
| sentiment | 0.8 |
| impacto | muy positivo |
| high_engaged_percentage | 45 |
| high_engaged_nps | 9.2 |
| at_risk_percentage | 15 |
| at_risk_nps | 4.5 |

## Paso 3: Publicar el Script

1. En Apps Script, haz clic en "Implementar" > "Nueva implementación"
2. Selecciona tipo: "Aplicación web"
3. Configuración:
   - **Ejecutar como**: Tu cuenta
   - **Acceso**: Cualquier persona
4. Haz clic en "Implementar"
5. Copia la URL que termina en `/exec`

## Paso 4: Conectar en Lovable

1. Ve a la pestaña "Google Sheets" en tu dashboard
2. Pega la URL del script
3. Haz clic en "Conectar"

¡Listo! Ahora tus datos se actualizarán automáticamente desde Google Sheets.

## 🔄 Actualización automática

El sistema se actualiza cada 2 minutos automáticamente, o puedes hacer clic en "Actualizar" manualmente.

## 🛠️ Personalización

Puedes modificar el script para:
- Leer de diferentes hojas
- Cambiar el formato de datos
- Agregar validaciones
- Incluir timestamps
