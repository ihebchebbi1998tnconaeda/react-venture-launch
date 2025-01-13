import React, { useState } from 'react';
import { AlertCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your JavaScript code here\n');
  const [errors, setErrors] = useState<string[]>([]);

  const validateCode = (input: string) => {
    const errors = [];
    try {
      // Basic validation
      new Function(input);
    } catch (e) {
      errors.push(e.message);
    }
    
    // Check for common strict mode violations
    if (input.includes('with(')) {
      errors.push("'with' statement is not allowed in strict mode");
    }
    
    setErrors(errors);
    return errors.length === 0;
  };

  const handleRunCode = () => {
    console.log('Running code:', code);
    if (validateCode(code)) {
      try {
        const result = new Function(`"use strict";\n${code}`)();
        toast.success('Code executed successfully!');
        console.log('Execution result:', result);
      } catch (e) {
        toast.error('Runtime error: ' + e.message);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            validateCode(e.target.value);
          }}
          className="w-full h-[400px] bg-editor-bg text-editor-text p-4 font-code resize-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck="false"
        />
        {errors.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 p-2 rounded">
            {errors.map((error, i) => (
              <div key={i} className="flex items-center gap-2 text-editor-error">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleRunCode} className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          Run Code
        </Button>
      </div>
    </div>
  );
};

export default CodeEditor;