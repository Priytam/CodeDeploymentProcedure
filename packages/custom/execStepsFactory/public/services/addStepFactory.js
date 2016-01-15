/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.execStepsFactory').factory('AddStepFactory', AddStepFactory);


function AddStepFactory() {

    var steps = [];
    var _plan = {};

    function setPlan(plan){
        _plan = plan;
    }

    function getPlan(){
        return _plan;
    }

    function getSteps(){
        return steps;
    }

    function clearSteps(){
        steps  = [];
    }

    function setStep(step) {
        steps.push(step);
    }
    var service = {
        getSteps : getSteps,
        setStep : setStep,
        clearSteps : clearSteps,
        setPlan : setPlan,
        getPlan : getPlan
    };

    return service;
}