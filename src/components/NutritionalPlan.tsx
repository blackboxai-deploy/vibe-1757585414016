import { patientData, nutritionalPlan,VET } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const NutritionalPlan = () => {
  const preGestationalIMC = (patientData.preGestationalWeight / (patientData.height * patientData.height)).toFixed(1);
  const currentIMC = (patientData.currentWeight / (patientData.height * patientData.height)).toFixed(1);
  const weightGain = patientData.currentWeight - patientData.preGestationalWeight;

  const getImcCategory = (imc: number) => {
    if (imc < 18.5) return "Baixo peso";
    if (imc >= 18.5 && imc <= 24.9) return "Adequado ou eutrófico";
    if (imc >= 25.0 && imc <= 29.9) return "Sobrepeso";
    if (imc >= 30.0) return "Obesidade";
    return "";
  };

  const getWeightGainAdequacy = (imc: number) => {
    if (imc >= 25.0 && imc <= 29.9) {
      if(patientData.gestationalAge <=13){
        return "0,5 a 2,0kg"
      }
      else{
        return "0,2 a 0,3 kg/semana"
      }
    }; 
    return "-"
  }

  return (
    <div className="space-y-8">
      {/* Patient Data */}
      <Card>
        <CardHeader>
          <CardTitle>Dados da Paciente</CardTitle>
          <CardDescription>Informações clínicas e de anamnese.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Nome:</strong> {patientData.name}</div>
            <div><strong>Idade:</strong> {patientData.age} anos</div>
            <div><strong>Idade Gestacional:</strong> {patientData.gestationalAge} semanas</div>
            <div><strong>Profissão:</strong> {patientData.profession}</div>
            <div><strong>Peso Pré-Gestacional:</strong> {patientData.preGestationalWeight} kg</div>
            <div><strong>Peso Atual:</strong> {patientData.currentWeight} kg</div>
            <div><strong>Altura:</strong> {patientData.height.toFixed(2)} m</div>
            <div><strong>Ganho de Peso Total:</strong> {weightGain.toFixed(1)} kg</div>
            <div><strong>Medicações:</strong> {patientData.medications}</div>
            <div className="md:col-span-2"><strong>Exames Laboratoriais:</strong> {patientData.labExams}</div>
            <div className="md:col-span-2"><strong>Relatos da Anamnese:</strong> {patientData.anamnesis}</div>
          </div>
        </CardContent>
      </Card>

      {
        VET && <Card>
        <CardHeader>
          <CardTitle>Demanda Energética</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A demanda energética total (VET) calculada para a paciente é de aproximadamente <strong>{VET} kcal/dia</strong>.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Esse valor considera o metabolismo basal, o efeito térmico dos alimentos, a atividade física (sedentária) e as necessidades adicionais do segundo trimestre de gestação.</p>
        </CardContent>
      </Card>
      }

      {/* Nutritional Intervention Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos da Intervenção Nutricional</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Controle da Anemia:</strong> Aumentar a ingestão de alimentos ricos em ferro (animal e vegetal) e vitamina C para potencializar a absorção.</li>
            <li><strong>Ganho de Peso Adequado:</strong> Monitorar e controlar o ganho de peso para se manter dentro das recomendações para gestantes com sobrepeso.</li>
            <li><strong>Melhora da Constipação:</strong> Aumentar o consumo de fibras através de frutas, verduras, legumes e cereais integrais, aliado a uma hidratação adequada.</li>
            <li><strong>Prevenção de Doenças:</strong> Controlar a dieta para reduzir os riscos de desenvolvimento de diabetes gestacional e hipertensão, considerando o histórico familiar.</li>
            <li><strong>Saúde Fetal:</strong> Garantir o aporte adequado de todos os nutrientes essenciais para o pleno desenvolvimento do feto.</li>
          </ul>
        </CardContent>
      </Card>

      {/* IMC and Weight Gain */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de IMC e Ganho de Peso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-lg font-semibold">IMC Pré-Gestacional</p>
              <p className="text-3xl font-bold">{preGestationalIMC}</p>
              <p className="text-md text-gray-700 dark:text-gray-300">{getImcCategory(parseFloat(preGestationalIMC))}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">IMC Atual</p>
              <p className="text-3xl font-bold">{currentIMC}</p>
              <p className="text-md text-gray-700 dark:text-gray-300">{getImcCategory(parseFloat(currentIMC))}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
             <p className="text-lg font-semibold">Recomendação de Ganho de Peso para o estado nutricional atual</p>
             <p className="text-2xl font-bold">{getWeightGainAdequacy(parseFloat(preGestationalIMC))}</p>
             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fonte: Institute of Medicine (IOM)</p>
          </div>
        </CardContent>
      </Card>

      

      {/* Nutritional Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Plano Alimentar</CardTitle>
          <CardDescription>Comparativo entre a alimentação atual e a proposta, com as devidas correções.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-[10%]">Refeição</TableHead>
                <TableHead className="font-bold w-[25%]">Plano Atual</TableHead>
                <TableHead className="font-bold w-[25%]">Plano Proposto</TableHead>
                <TableHead className="font-bold w-[40%]">Correções e Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nutritionalPlan.map((item) => (
                <TableRow key={item.meal}>
                  <TableCell className="font-semibold">{item.meal}<br/><span className="font-normal text-sm">({item.currentTime})</span></TableCell>
                  <TableCell>{item.currentMenu}</TableCell>
                  <TableCell>{item.proposedMenu}</TableCell>
                  <TableCell className="text-sm text-gray-700 dark:text-gray-300">{item.corrections}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionalPlan;
