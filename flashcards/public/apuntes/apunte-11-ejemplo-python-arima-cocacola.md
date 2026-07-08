---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte (complementario)
numero_apunte: 11
unidad: 3
titulo_unidad: Pronósticos de Demanda
temas_del_plan:
  - Modelos/Métodos cuantitativos.
  - Precisión del pronóstico y medidas de errores. Control de pronósticos.
presentacion_fuente: "Sin diapositiva — ejemplo en notebook de cátedra: Unidad_3_-_12_-_Ejemplo_Coca-Cola (notebook-HTML) + Unidad_3_-_13_-_Coca-Cola_datos.csv"
fuentes:
  - "Notebook de cátedra: recursos-pronosticos/cocacola-notebook.html"
  - "Datos: recursos-pronosticos/cocacola-datos.csv (cotización diaria de KO)"
  - "Librerías: statsmodels (ARIMA, SARIMAX), scikit-learn (RMSE, MAE), pandas, matplotlib"
anio: 2025
---

# Apunte 11 — Ejemplo en Python: pronóstico de una serie real con ARIMA/SARIMAX (Coca-Cola)

> **Unidad 3 — Pronósticos de Demanda (apunte complementario).** Ejemplo de **enriquecimiento** que lleva el pronóstico de series de tiempo **más allá del Excel**: en lugar de los métodos de la plantilla (medias móviles, alisado, tendencia, estacional), aplica modelos **ARIMA / SARIMAX** en **Python** sobre una serie real y larga —la **cotización de la acción de Coca-Cola (KO)**— evaluando con **train/test** y métricas de error. No reemplaza a los métodos de la cátedra: los **generaliza** y conecta con los conceptos del [[apunte-7-pronosticos-de-demanda|Apunte 7]].

**Recursos asociados** (en `recursos-pronosticos/`): `cocacola-notebook.html` (el notebook de cátedra renderizado) y `cocacola-datos.csv` (los datos). Para ejecutarlo hacen falta `pandas`, `numpy`, `matplotlib`, `statsmodels` y `scikit-learn`.

> **Nota sobre el archivo.** El "notebook" entregado por la cátedra (`…_12_….ipynb`) es en realidad una **página HTML** guardada del campus (un notebook renderizado), no un `.ipynb` JSON ejecutable. Se conserva como `cocacola-notebook.html` para lectura; para correrlo conviene recrear las celdas en un Jupyter/Colab nuevo apuntando a `cocacola-datos.csv`.

---

## 1. Los datos

`cocacola-datos.csv` contiene la **serie diaria** de la acción de Coca-Cola (ticker **KO**) desde **1962**, con ≈ **15.930 filas** y columnas: `date, open, high, low, close, adj_close, volume`. El ejemplo pronostica el **precio de cierre** (`close`).

```python
import pandas as pd
df = pd.read_csv('dataset.csv')          # cocacola-datos.csv
df['date'] = pd.to_datetime(df['date'])
# variable objetivo: df['close']
```

> Es una serie **financiera**, no una demanda de producto; se usa como **serie de tiempo rica** (larga, con tendencia y variabilidad) para mostrar las técnicas. La lógica de "pronosticar el futuro a partir del pasado" es la misma del Apunte 7.

---

## 2. De los métodos de la cátedra a ARIMA: el puente conceptual

ARIMA(**p, d, q**) y su variante estacional SARIMAX no son ajenos a lo visto: **integran en un solo modelo** ideas que en el curso aparecen por separado.

| Componente ARIMA/SARIMAX | Qué hace | Concepto equivalente del Apunte 7 |
|---|---|---|
| **AR (p)** — autorregresivo | El valor depende de sus propios valores pasados | Ecuaciones **autorregresivas** ($y = c_0 + c_1 y_{-1} + \dots$) vistas en simulación |
| **I (d)** — integración (diferenciación) | Resta valores consecutivos para **quitar la tendencia** y volver la serie estacionaria | Tratamiento de la **tendencia** (T) |
| **MA (q)** — media móvil de errores | Promedia los **errores** recientes del modelo | Idea de **suavizado**/medias móviles (sobre el error) |
| **seasonal_order (P,D,Q,s)** | Repite la estructura con período estacional `s` (p. ej. `s=12`) | **Estacionalidad** (S) / ajuste estacional |
| **RMSE / MAE** sobre test | Miden el error del pronóstico | Extensión de **MAD / MAPD** del Apunte 7 |
| **train / test split** | Ajustar en el pasado y evaluar en datos no vistos | Versión rigurosa de "calcular sobre los **períodos históricos** y evaluar la exactitud" (proceso de pronóstico) |
| **conf_int(alpha=0.05)** | Intervalo de confianza del pronóstico | El pronóstico **bajo incertidumbre** (Apunte 7): no un número exacto, sino un rango |

---

## 3. El flujo de trabajo del notebook

1. **Carga y preparación.** Leer el CSV, parsear fechas, quedarse con `close`.
2. **División train / test.** Entrenar con el tramo inicial y reservar el final para evaluar:
   ```python
   y = train['close']
   ```
3. **Ajuste de modelos** (statsmodels), de menor a mayor complejidad:
   ```python
   from statsmodels.tsa.statespace.sarimax import SARIMAX
   from statsmodels.tsa.arima.model import ARIMA

   ARMA   = SARIMAX(y, order=(1, 0, 1)).fit()              # AR + MA, sin diferenciar
   arima  = ARIMA(y, order=(2, 2, 2)).fit()                # con d=2 (quita tendencia)
   sarima = SARIMAX(y, order=(1, 1, 1),
                    seasonal_order=(2, 2, 2, 12)).fit()     # + componente estacional (s=12)
   ```
4. **Pronóstico sobre el horizonte de test**, con intervalo de confianza:
   ```python
   y_pred = arima.get_forecast(len(test.index))
   y_pred_df = y_pred.conf_int(alpha=0.05)     # banda de incertidumbre
   ```
5. **Evaluación** con métricas de error:
   ```python
   import numpy as np
   from sklearn.metrics import mean_squared_error, mean_absolute_error
   rmse = np.sqrt(mean_squared_error(test['close'], y_pred))
   mae  = mean_absolute_error(test['close'], y_pred)
   ```
6. **Búsqueda del mejor modelo** (*grid search*): se barren combinaciones de `(p, d, q)` y se conserva la de **menor RMSE** (`best_params`, `best_rmse`, `best_mae`). Es la versión automatizada del paso "ajustar parámetros del modelo o seleccionar otro método" del proceso de pronóstico.

> En las corridas del notebook, el modelo tipo ARMA `(1,0,1)` reporta un RMSE del orden de **≈ 3.9** sobre el test; la comparación de RMSE/MAE entre ARMA, ARIMA y SARIMAX es la que decide el modelo definitivo, igual que MAD/MAPD deciden entre los métodos de Excel.

---

## 4. Qué aporta este ejemplo (y qué exige)

**Aporta:**

- Un método para series **largas y complejas** que los modelos de la plantilla no manejan bien (recordar del [[apunte-8-comparacion-modelos-pronostico|Apunte 8]] que ningún método de la cátedra modela ciclos): ARIMA/SARIMAX capturan **autocorrelación, tendencia (vía diferenciación) y estacionalidad** en un único modelo.
- Una práctica de evaluación **rigurosa** (train/test, RMSE/MAE, intervalos de confianza).

**Exige** (criterios de implementación del Apunte 7, §9): un entorno con **librerías especializadas** (statsmodels, scikit-learn) y más **complejidad y parámetros** que una planilla. El *trade-off* es el habitual: mayor potencia de modelado a cambio de mayor complejidad de implementación; en un sistema de gestión de pronósticos que deba correr miles de series, ese costo es un factor de decisión real.

---

## Síntesis del apunte

Este complemento muestra el pronóstico de series de tiempo en **Python con ARIMA/SARIMAX** sobre la cotización de Coca-Cola. Lejos de ser otra cosa, **unifica** lo visto en el curso: lo autorregresivo (AR), el tratamiento de la tendencia por diferenciación (I), el suavizado del error (MA) y la estacionalidad (componente estacional), evaluados con métricas de error (RMSE/MAE, parientes del MAD/MAPD) bajo un esquema train/test e intervalos de confianza. Es el puente entre los **métodos de planilla** de la cátedra y las **herramientas de un sistema real** de pronóstico.
