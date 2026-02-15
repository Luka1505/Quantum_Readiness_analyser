import random
import math

try:
    from qiskit import QuantumCircuit
    from qiskit_aer import AerSimulator
    QISKIT_AVAILABLE = True
except ImportError:
    QISKIT_AVAILABLE = False


def run_dynamic_quantum_simulation(scale: str, suitability_score: int):
    """
    Runs dynamically parameterized quantum circuit
    and returns structured output compatible with frontend.
    """

    if not QISKIT_AVAILABLE:
        return {
            "status": "Qiskit not installed",
            "qubits_used": 0,
            "measured_state": None,
            "probability": None,
            "measurement_distribution": {}
        }

    scale_map = {
        "small": 2,
        "medium": 3,
        "large": 4,
        "massive": 5
    }

    n_qubits = scale_map.get(scale, 2)

    qc = QuantumCircuit(n_qubits)

    # Superposition layer
    for i in range(n_qubits):
        qc.h(i)

    # Dynamic rotation
    base_angle = (suitability_score / 100) * math.pi

    for i in range(n_qubits):
        jitter = random.uniform(-0.2, 0.2)
        qc.ry(base_angle + jitter, i)

    # Entanglement
    for i in range(n_qubits - 1):
        qc.cx(i, i + 1)

    qc.measure_all()

    simulator = AerSimulator()
    job = simulator.run(qc, shots=1024)
    result = job.result()
    counts = result.get_counts()

    # 🔥 Extract most probable state
    measured_state = max(counts, key=counts.get)
    probability = round(counts[measured_state] / 1024, 3)

    return {
        "status": "success",
        "qubits_used": n_qubits,
        "measured_state": measured_state,
        "probability": probability,
        "measurement_distribution": counts
    }
